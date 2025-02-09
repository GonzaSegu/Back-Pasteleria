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

        const { rows: [registroCreado] } = await pool.query(SQLQuery)
        return registroCreado
    } catch (error) {
        throw error
    }
}


const readProducts = async (limit = 5, order_by="id_ASC", page = 1) => {   //se puede pasar con destructuring ({ limit = 10}) o solo como parametro limit = 10 
    try {
        const [campo, direccion] = order_by.split("_")   //split divide id_ASC en ['id', 'ASC']
        const offset = Math.abs((page-1) * limit)
        const SQLQuery = format(`
            SELECT * FROM producto 
            ORDER BY %s %s
            LIMIT %s
            OFFSET %s`,
            campo,
            direccion,
            limit, 
            offset
        );
        const { rows, rowCount } = await pool.query(SQLQuery)
        const { rowCount: count } = await pool.query('SELECT * FROM producto')
         // { rowCount: count }   Desestructuración con renombramiento:
         // console.log(SQLQuery)  para ver en consola sentencia SQL
        return {rows, rowCount, pages: Math.ceil(count/limit)}
    } catch (error) {
        throw error // Lanza el error capturado para que pueda ser manejado por el llamador
    }
}

const readProduct = async (id) => {
    try {
        const SQLQuery = format('SELECT * FROM producto WHERE id = %L', id)
        const { rows } = await pool.query(SQLQuery)
        return rows
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

        const { rows: [registroActualizado] } = await pool.query(SQLQuery)
        return registroActualizado
    } catch (error) {
        throw error
    }
}


const deleteProduct = async (id) => {
    try {
        const SQLQuery = format('DELETE FROM producto WHERE id = %L RETURNING *', id)
        const { rows: [registro]} = await pool.query(SQLQuery)
        return registro //devuelve al cliente el registro eliminado
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


module.exports = {createProduct, readProducts, readProduct, updateProduct, deleteProduct, existsProduct}