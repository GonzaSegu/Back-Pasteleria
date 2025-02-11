const pool = require('../config/db')
const format = require ('pg-format')

const createEstado = async (nombre_estado) =>{
    try {
        const SQLQuery = format(`
            INSERT INTO estado
            (nombre_estado) 
            VALUES (%L) RETURNING *`, nombre_estado)
        const { rows : [newEstado] } = await pool.query(SQLQuery)
        return newEstado    
    
    } catch (error) {
        throw error
    } 
}

const readEstados = async () => {
    try {
        const SQLQuery = format (`
            SELECT * FROM estado order by nombre_estado
            `)
        const {rows: estados , rowCount } = await pool.query(SQLQuery)
        return { estados, rowCount}
    
    } catch (error) {
        throw error
    }
}

const readEstado = async (id) => {
    try {
        const SQLQuery = format(`
        SELECT * from estado WHERE id = %s`, id)
        const { rows: [estado] } = await pool.query(SQLQuery)
        return estado
    
    } catch (error) {
        throw error
    }
 }

const updateEstado = async (id, nombre_estado) => {
    try {
        const SQLQuery = format(`
        UPDATE estado SET nombre_estado = %L WHERE id = %s RETURNING *`, 
        nombre_estado, id)

        const { rows: [updatedEstado] } = await pool.query(SQLQuery)
        return updatedEstado
    
    } catch (error) {
        throw error
    }
}

const deleteEstado = async (id) => {
    try {
        const SQLQuery = format(`
            DELETE FROM estado WHERE id = %L RETURNING *`, id)
        
        const { rows : [deletedEstado] } = await pool.query(SQLQuery)
        return deletedEstado
    } catch (error) {
        throw error
    }
}

const existsEstado = async (id) => {
    try {
        const SQLQuery = format('SELECT * FROM estado WHERE id = %L', id)
        const { rowCount } = await pool.query(SQLQuery)
        return rowCount ? true : false
    } catch (error) {
        throw error
    }
}

module.exports = {createEstado, readEstados, readEstado, updateEstado, deleteEstado, existsEstado}
