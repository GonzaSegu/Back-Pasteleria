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
        const { rows : orden } = await pool.query(ordenQuery);
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
        const { rows : detalle } = await pool.query(detalleQuery);
        
        // RETURN de CREATE ORDEN
        return { orden, detalle }

    } catch (error) {
        throw error;
    }
};

const readOrdenes = async () =>{
    try {
        const SQLQuery = format(`
            SELECT * from orden    
        `)
        const { rows : ordenes, rowCount } =await pool.query(SQLQuery)
        return { ordenes, rowCount }

    } catch (error) {
        throw new Error
    }
}

const readOrden = async (id) => {
    try {
        const SQLQuery = format(`
            SELECT * FROM Orden WHERE id = %L
        `, id);
        const { rows: [orden] } = await pool.query(SQLQuery);
        return orden;
        
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
        const { rows: [deletedOrden]} = await pool.query(SQLQuery);

        return deletedOrden
    } catch (error) {
        throw error;
    }
};

const readOrdenDetalles = async () => {
    try {
        const SQLQuery = format(`
            SELECT 
                o.id AS orden_id,
                o.user_id,
                u.nombre AS usuario_nombre,
                o.estado_id,
                e.nombre_estado AS estado_nombre,
                o.monto_total,
                o.fecha_orden,
                d.id AS detalle_id,
                c.nombre_categoria AS categoria_nombre,
                d.producto_id,
                p.nombre_producto AS producto_nombre,
                d.porcion_id,
                po.nombre_porcion AS porcion_nombre,
                d.cantidad,
                d.precio
            FROM Orden o
            JOIN Detalle_Orden d ON o.id = d.orden_id
            JOIN usuario u ON o.user_id = u.id
            JOIN estado e ON o.estado_id = e.id
            JOIN producto p ON d.producto_id = p.id
            JOIN porcion po ON d.porcion_id = po.id
            JOIN categoria c ON p.categoria_id = c.id
        `);
        const { rows: OrdenDetalles } = await pool.query(SQLQuery);
        return OrdenDetalles;
    } catch (error) {
        throw error;
    }
};

const readOrdenDetalle = async (id) => {
    try {
        const SQLQuery = format(`
            SELECT 
                o.id AS orden_id,
                o.user_id,
                u.nombre AS usuario_nombre,
                o.estado_id,
                e.nombre_estado AS estado_nombre,
                o.monto_total,
                o.fecha_orden,
                d.id AS detalle_id,
                c.nombre_categoria AS categoria_nombre,
                d.producto_id,
                p.nombre_producto AS producto_nombre,
                d.porcion_id,
                po.nombre_porcion AS porcion_nombre,
                d.cantidad,
                d.precio
            FROM Orden o
            JOIN Detalle_Orden d ON o.id = d.orden_id
            JOIN usuario u ON o.user_id = u.id
            JOIN estado e ON o.estado_id = e.id
            JOIN producto p ON d.producto_id = p.id
            JOIN porcion po ON d.porcion_id = po.id
            JOIN categoria c ON p.categoria_id = c.id
            WHERE orden_id = %L
        `, id);
        const { rows: ordenDetalle } = await pool.query(SQLQuery);
        return ordenDetalle;
        
    } catch (error) {
        throw error;
    }
};

const existsOrden = async (id) => {
    try {
        const SQLQuery = format(`
            SELECT * FROM orden WHERE id = %L`, id)
        const { rowCount } = await pool.query(SQLQuery)
        return rowCount ? true : false

    } catch (error) {
        throw error
    }
}


module.exports = { createOrden, readOrdenes, readOrden, updateOrden, deleteOrden, readOrdenDetalles, readOrdenDetalle, existsOrden };