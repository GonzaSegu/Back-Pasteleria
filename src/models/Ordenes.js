const pool = require('../config/db')
const format = require('pg-format')

const createOrden = async (user_id, estado_id, detalle_orden) => {
    try {
        // Obtener precios de los productos desde la BBDD
        const productosId = detalle_orden.map(item => item.producto_id);
        const precioQuery = format(
            `SELECT id, precio FROM Producto WHERE id IN (%L)`,
            productosId
        );
        const { rows: productos } = await pool.query(precioQuery);

        // Objeto producto_id: precio 
        const priceMap = {};
        productos.forEach(product => {
            priceMap[product.id] = product.precio;
        }); // ej: priceMap={1: 5000, 2: 7500, 3: 10000}

        //
        let monto_total = 0;
        detalle_orden.forEach(item => {
            const precio = priceMap[item.producto_id] || 0; // Precio de la BBDD
            monto_total += precio * item.cantidad;
        });

        // Insertar orden
        const ordenQuery = format(
            `INSERT INTO Orden (user_id, estado_id, monto_total) 
            VALUES (%L, %L, %L) RETURNING *`,
            user_id,
            estado_id,
            monto_total
        );
        const { rows: orden } = await pool.query(ordenQuery);
        const orden_id = orden[0].id;

        // Consulta para insertar en Detalle_Orden
        const values = detalle_orden.map(item => [
            item.producto_id,
            orden_id,
            item.porcion_id,
            item.cantidad,
            priceMap[item.producto_id] // Obtiene precio actualizado
        ]); // ej: values=[[1, 10, 2, 3, 5000],[2, 10, 1, 5, 7500]]

        const detalleQuery = format(
            `INSERT INTO Detalle_Orden 
            (producto_id, orden_id, porcion_id, cantidad, precio) VALUES %L RETURNING *`,
            values
        );
        const { rows: detalle } = await pool.query(detalleQuery);

        // RETURN de CREATE ORDEN
        return { orden, detalle }

    } catch (error) {
        throw error;
    }
};

const readOrdenes = async (limit = 5, order_by = "id_ASC", page = 1) => {
    try {
        const [campo, direccion] = order_by.split("_")
        const offset = Math.abs((page - 1) * limit)

        const SQLQuery = format(`
            SELECT * FROM Orden 
            ORDER BY %I %s 
            LIMIT %L 
            OFFSET %L
        `, campo, direccion, limit, offset);

        const { rows } = await pool.query(SQLQuery)
        const countQuery = format(`SELECT COUNT(*) AS count FROM Orden`);
        const { rows: [{ count }] } = await pool.query(countQuery);

        const totalPages = Math.ceil(count / limit);
        const currentPage = Math.min(Number(page), totalPages);
        
        const pagination = {
            current_page: currentPage,
            total_pages: totalPages,
            next_page: currentPage < totalPages ? currentPage + 1 : null,
            prev_page: currentPage > 1 ? currentPage - 1 : null,
        };

        return {
            total: count,
            results: rows,
            pagination,
        }
    } catch (error) {
        throw new Error
    }
}

const readOrden = async (id, limit = 10, order_by = "id_DESC", page = 1) => {
    try {
        const [campo, direccion] = order_by.split("_")
        const offset = Math.abs((page - 1) * limit)

        const SQLQuery = format(`
            SELECT * FROM Orden 
            WHERE user_id = %L 
            ORDER BY %I %s 
            LIMIT %L 
            OFFSET %L
        `, id, campo, direccion, limit, offset);

        const { rows } = await pool.query(SQLQuery);
        const countQuery = format(`SELECT COUNT(*) AS count FROM Orden WHERE user_id = %L`, id);

        const { rows: [{ count }] } = await pool.query(countQuery);

        const totalPages = Math.ceil(count / limit);
        const currentPage = Math.min(Number(page), totalPages);

        const pagination = {
            current_page: currentPage,
            total_pages: totalPages,
            next_page: currentPage < totalPages ? currentPage + 1 : null,
            prev_page: currentPage > 1 ? currentPage - 1 : null,
        };

        return {
            total: count,
            results: rows,
            pagination,
        }

    } catch (error) {
        throw error;
    }
};

const updateOrden = async (id, estado_id) => {
    try {
        const SQLQuery = format(`
            UPDATE Orden 
            SET estado_id = %L
            WHERE id = %L
            RETURNING *`,
            estado_id, id);
        const { rows: [updatedOrden] } = await pool.query(SQLQuery);
        return updatedOrden;

    } catch (error) {
        throw error;
    }
};

const deleteOrden = async (id) => {
    try {
        const SQLQuery = format(`
            DELETE FROM Orden WHERE id = %L`, id);
        const { rows: [deletedOrden] } = await pool.query(SQLQuery);

        return deletedOrden

    } catch (error) {
        throw error;
    }
};

const readOrdenDetalles = async (ordenId) => {
    try {
        const SQLQuery = format(`
            SELECT 
                d.id AS detalle_id,
                c.nombre_categoria,
                d.producto_id,
                p.nombre_producto,
                po.nombre_porcion,
                d.cantidad,
                d.precio,
                (d.cantidad * d.precio) AS subtotal
            FROM Detalle_Orden d
            JOIN producto p ON d.producto_id = p.id
            JOIN porcion po ON d.porcion_id = po.id
            JOIN categoria c ON p.categoria_id = c.id
            WHERE d.orden_id = %L
        `, ordenId );

        const { rows } = await pool.query(SQLQuery);

        const totalQuery = format(`
            SELECT 
                O.id AS orden_id,
                O.user_id,
                U.nombre AS usuario_nombre,
                O.estado_id,
                E.nombre_estado AS estado_nombre,
                O.monto_total,
                O.fecha_orden
            FROM Orden O
            JOIN usuario U ON O.user_id = U.id
            JOIN estado E ON O.estado_id = E.id
            WHERE O.id = %L`, ordenId);

        const { rows: general } = await pool.query(totalQuery);

        console.log("Detalles obtenidos:", rows);
        console.log("Datos generales obtenidos:", general);

        return {
            msg: "Detalle de la orden",
            data: {
                orden_id: general[0].orden_id,
                user_id: general[0].user_id,
                usuario_nombre: general[0].usuario_nombre,
                estado_id: general[0].estado_id,
                nombre_estado: general[0].nombre_estado,
                monto_total: general[0].monto_total,
                fecha_orden: general[0].fecha_orden,
                detalle_orden: rows
            }
        };
    } catch (error) {
        throw error;
    }
};

const readOrdenDetalle = async (userId, ordenId) => {
    try {
        // Detalle de los productos 
        const SQLQuery = format(`
            SELECT 
                d.id AS detalle_id,
                c.nombre_categoria AS categoria_nombre,
                d.producto_id,
                p.nombre_producto AS producto_nombre,
                po.nombre_porcion AS porcion_nombre,
                d.cantidad,
                d.precio,
                (d.cantidad * d.precio) AS subtotal
            FROM Orden o
            JOIN Detalle_Orden d ON o.id = d.orden_id
            JOIN producto p ON d.producto_id = p.id
            JOIN porcion po ON d.porcion_id = po.id
            JOIN categoria c ON p.categoria_id = c.id
             WHERE o.user_id = %L AND o.id = %L
        `, userId, ordenId);
        
        const { rows } = await pool.query(SQLQuery);

        const countQuery = format(`SELECT COUNT(*) AS count FROM detalle_orden WHERE orden_id = %L`, ordenId);
        const { rows: [{ count }] } = await pool.query(countQuery);

        // Información general de la orden
        const totalQuery = format(`
            SELECT O.id AS Order_id, O.fecha_orden, O.monto_total, E.nombre_estado, O.user_id, U.nombre, U.apellido,U.email, U.telefono
            FROM Orden AS O
            INNER JOIN usuario AS U ON U.id = O.user_id
            INNER JOIN estado AS E ON E.id = O.estado_id
            WHERE O.id = %L`, ordenId);
        const { rows: total } = await pool.query(totalQuery);

        console.log('total', total)

        return {
            user_id: total[0].user_id,
            order_id:total[0].order_id,
            nombre: total[0].nombre,
            apellido: total[0].apellido,
            nombre_estado: total[0].nombre_estado,
            total: total[0].monto_total,
            fecha_orden: total[0].fecha_orden,
            total_productos: count,
            results: rows,
        }

    } catch (error) {
        throw error;
    }
};

const existsOrden = async (ordenId) => {
    try {
        const SQLQuery = format(`
            SELECT * FROM orden WHERE id = %L`, ordenId)
        const { rowCount } = await pool.query(SQLQuery)
        return rowCount ? true : false

    } catch (error) {
        throw error
    }
}


module.exports = { createOrden, readOrdenes, readOrden, updateOrden, deleteOrden, readOrdenDetalles, readOrdenDetalle, existsOrden };