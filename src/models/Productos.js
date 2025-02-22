const pool = require('../config/db')
const format = require('pg-format')

const createProduct = async (nombre_producto, precio, stock, imagen_url, azucar, gluten, lactosa, forma, categoria_id, porcion_id) => {
    try {
        const SQLQuery = format(`
            INSERT INTO producto 
            (nombre_producto, precio, stock, imagen_url, azucar, gluten, lactosa, forma_id, categoria_id, porcion_id) 
            VALUES (%L, %s, %s, %L, %L, %L, %L, %s, %s, %s) 
            RETURNING *`,
            nombre_producto, precio, stock, imagen_url, azucar, gluten, lactosa, forma, categoria_id, porcion_id)
        const { rows: [newProduct] } = await pool.query(SQLQuery)
        return newProduct

    } catch (error) {
        throw error
    }
}

const readProducts = async (limit = 5, order_by = "id_ASC", page = 1) => {   //se puede pasar con destructuring ({ limit = 10}) o solo como parametro limit = 10 
    try {
        const [campo, direccion] = order_by.split("_")   //split divide id_ASC en ['id', 'ASC']
        const offset = Math.abs((page - 1) * limit)
        const SQLQuery = format(`
            SELECT 
                producto.id, 
                producto.nombre_producto AS nombre_producto, 
                producto.precio AS precio,
                producto.stock AS stock,
                producto.imagen_url AS imagen_url,
                producto.azucar AS azucar,
                producto.gluten AS gluten,
                producto.lactosa AS lactosa, 
                forma.nombre_forma AS nombre_forma,
                categoria.nombre_categoria AS nombre_categoria,
                porcion.nombre_porcion AS nombre_porcion
            FROM producto
            JOIN forma ON producto.forma_id = forma.id
            JOIN categoria ON producto.categoria_id = categoria.id
            JOIN porcion ON producto.porcion_id = porcion.id
            ORDER BY %s %s
            LIMIT %s
            OFFSET %s`,
            campo, direccion, limit, offset);
        const { rows } = await pool.query(SQLQuery)
        const { rows: [{ count }] } = await pool.query('SELECT COUNT(*) AS count FROM Producto')

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
        throw error // Lanza el error capturado para que pueda ser manejado por el llamador
    }
}

const readProduct = async (id) => {
    try {
        const SQLQuery = format(`
             SELECT 
                producto.id, 
                producto.nombre_producto AS nombre_producto, 
                producto.precio AS precio,
                producto.stock AS stock,
                producto.imagen_url AS imagen_url,
                producto.azucar AS azucar,
                producto.gluten AS gluten,
                producto.lactosa AS lactosa, 
                forma.nombre_forma AS nombre_forma,
                categoria.nombre_categoria AS nombre_categoria,
                porcion.nombre_porcion AS nombre_porcion
            FROM producto
            JOIN forma ON producto.forma_id = forma.id
            JOIN categoria ON producto.categoria_id = categoria.id
            JOIN porcion ON producto.porcion_id = porcion.id
            WHERE producto.id = %L`, 
            id);
        const { rows } = await pool.query(SQLQuery)

        if (rows.length === 0) {
            throw new Error("Producto no encontrado");
        }

        const product = rows[0];

        return product

    } catch (error) {
        throw error
    }
}

const updateProduct = async (id, nombre_producto, precio, stock, imagen_url, azucar, gluten, lactosa, forma_id, categoria_id, porcion_id) => {
    try {
        const SQLQuery = format(`
            UPDATE producto 
            SET nombre_producto = %L, 
                precio = %s, 
                stock = %s, 
                imagen_url = %L, 
                azucar = %L, 
                gluten = %L, 
                lactosa = %L, 
                forma_id = %s, 
                categoria_id = %s, 
                porcion_id = %s 
            WHERE id = %s 
            RETURNING *`, 
            nombre_producto, precio, stock, imagen_url, azucar, gluten, lactosa, forma_id, categoria_id, porcion_id, id)

        const { rows: [updatedProduct] } = await pool.query(SQLQuery)
        return updatedProduct

    } catch (error) {
        throw error
    }
}

const deleteProduct = async (id) => {
    try {
        const SQLQuery = format('DELETE FROM producto WHERE id = %L RETURNING *', id)
        const { rows: [deletedProduct] } = await pool.query(SQLQuery)
        return deletedProduct //devuelve al cliente el registro eliminado

    } catch (error) {
        throw error
    }
}

const existsProduct = async (id) => {
    try {
        const SQLQuery = format('SELECT * FROM producto WHERE id = %L', id)
        const { rowCount } = await pool.query(SQLQuery)
        return rowCount ? true : false

    } catch (error) {
        throw error
    }
}

const getProductFilter = async (categoria_id, azucar, gluten, lactosa, limit = 5, page = 1) => {
    try {
        const { query, queryCount } = auxfilterProduct(categoria_id, azucar, gluten, lactosa);

        // Calcular el offset para la paginación
        const offset = Math.abs((page - 1) * limit);

        // Modificar la consulta para incluir LIMIT y OFFSET
        const paginatedQuery = `${query} LIMIT ${limit} OFFSET ${offset}`;

        // Consultar productos con los filtros y paginación
        const { rows } = await pool.query(paginatedQuery);

        const { rows: countRows } = await pool.query(queryCount);
        const total = countRows[0].count;

        // Calcular el número de páginas
        const totalPages = Math.ceil(total / limit);
        const currentPage = Math.min(Number(page), totalPages);

        // Estructura de paginación
        const pagination = {
            current_page: currentPage,
            total_pages: totalPages,
            next_page: currentPage < totalPages ? currentPage + 1 : null,
            prev_page: currentPage > 1 ? currentPage - 1 : null,
        };

        return {
            total: total,
            results: rows,
            pagination,
        }

    } catch (error) {
        throw error
    }
}

const auxfilterProduct = (categoria_id = '', azucar = '', gluten = '', lactosa = '') => {
    let filtros = [];
    if (categoria_id) filtros.push(`categoria_id = '${categoria_id}'`)
    if (azucar) filtros.push(`azucar = '${azucar}'`)
    if (gluten) filtros.push(`gluten = '${gluten}'`)
    if (lactosa) filtros.push(`lactosa = '${lactosa}'`)

    let query = format(`
        SELECT 
            producto.id, 
            producto.nombre_producto AS nombre_producto, 
            producto.precio AS precio,
            producto.stock AS stock,
            producto.imagen_url AS imagen_url,
            producto.azucar AS azucar,
            producto.gluten AS gluten,
            producto.lactosa AS lactosa, 
            forma.nombre_forma AS nombre_forma,
            categoria.nombre_categoria AS nombre_categoria,
            porcion.nombre_porcion AS nombre_porcion
        FROM producto
        JOIN forma ON producto.forma_id = forma.id
        JOIN categoria ON producto.categoria_id = categoria.id
        JOIN porcion ON producto.porcion_id = porcion.id`);


    if (filtros.length > 0) {
        query += ` WHERE ${filtros.join(" AND ")}`;
    }

    let queryCount = `
    SELECT COUNT(*) AS count 
    FROM producto p
    LEFT JOIN Categoria c ON p.categoria_id = c.id
`;

    if (filtros.length > 0) {
        queryCount += ` WHERE ${filtros.join(" AND ")}`;
    }

    return {
        query,
        queryCount
    };
}

module.exports = { createProduct, readProducts, readProduct, updateProduct, deleteProduct, existsProduct, getProductFilter }
