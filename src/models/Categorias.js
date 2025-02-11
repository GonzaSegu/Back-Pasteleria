const pool = require('../config/db')
const format = require ('pg-format')

const createCategoria = async (nombre_categoria) =>{
    try {
        const SQLQuery = format(`
            INSERT INTO categoria
            (nombre_categoria) 
            VALUES (%L) RETURNING *`, nombre_categoria)
        const { rows : [newCategoria] } = await pool.query(SQLQuery)
        return newCategoria    
    
    } catch (error) {
        throw error
    } 
}

const readCategorias = async () => {
    try {
        const SQLQuery = format (`
            SELECT * FROM categoria order by nombre_categoria
            `)
        const {rows: categorias , rowCount } = await pool.query(SQLQuery)
        return { categorias, rowCount}
    
    } catch (error) {
        throw error
    }
}

const readCategoria = async (id) => {
    try {
        const SQLQuery = format(`
        SELECT * from categoria WHERE id = %s`, id)
        const { rows: [categoria] } = await pool.query(SQLQuery)
        return categoria
    
    } catch (error) {
        throw error
    }
 }

const updateCategoria = async (id, nombre_categoria) => {
    try {
        const SQLQuery = format(`
        UPDATE categoria SET nombre_categoria = %L WHERE id = %s RETURNING *`, 
        nombre_categoria, id)

        const { rows: [updatedCategoria] } = await pool.query(SQLQuery)
        return updatedCategoria
    
    } catch (error) {
        throw error
    }
}

const deleteCategoria = async (id) => {
    try {
        const SQLQuery = format(`
            DELETE FROM categoria WHERE id = %L RETURNING *`, id)
        
        const { rows : [deletedCategoria] } = await pool.query(SQLQuery)
        return deletedCategoria
    } catch (error) {
        throw error
    }
}

const existsCategoria = async (id) => {
    try {
        const SQLQuery = format('SELECT * FROM categoria WHERE id = %L', id)
        const { rowCount } = await pool.query(SQLQuery)
        return rowCount ? true : false
    } catch (error) {
        throw error
    }
}

module.exports = {createCategoria, readCategorias, readCategoria, updateCategoria, deleteCategoria, existsCategoria}
