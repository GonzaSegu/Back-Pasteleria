const pool = require('../config/db')
const format = require ('pg-format')

const createPorcion = async (nombre_porcion) =>{
    try {
        const SQLQuery = format(`
            INSERT INTO porcion
            (nombre_porcion) 
            VALUES (%L) RETURNING *`, nombre_porcion)
        const { rows : [newPorcion] } = await pool.query(SQLQuery)
        return newPorcion    
    
    } catch (error) {
        throw error
    } 
}

const readPorciones = async () => {
    try {
        const SQLQuery = format (`
            SELECT * FROM porcion order by nombre_porcion
            `)
        const {rows: porciones , rowCount } = await pool.query(SQLQuery)
        return { porciones, rowCount}
    
    } catch (error) {
        throw error
    }
}

const readPorcion = async (id) => {
    try {
        const SQLQuery = format(`
        SELECT * from porcion WHERE id = %s`, id)
        const { rows: [porcion] } = await pool.query(SQLQuery)
        return porcion
    
    } catch (error) {
        throw error
    }
 }

const updatePorcion = async (id, nombre_porcion) => {
    try {
        const SQLQuery = format(`
        UPDATE porcion SET nombre_porcion = %L WHERE id = %s RETURNING *`, 
        nombre_porcion, id)

        const { rows: [updatedPorcion] } = await pool.query(SQLQuery)
        return updatedPorcion
    
    } catch (error) {
        throw error
    }
}

const deletePorcion = async (id) => {
    try {
        const SQLQuery = format(`
            DELETE FROM porcion WHERE id = %L RETURNING *`, id)
        
        const { rows : [deletedPorcion] } = await pool.query(SQLQuery)
        return deletedPorcion
    } catch (error) {
        throw error
    }
}

const existsPorcion = async (id) => {
    try {
        const SQLQuery = format('SELECT * FROM porcion WHERE id = %L', id)
        const { rowCount } = await pool.query(SQLQuery)
        return rowCount ? true : false
    } catch (error) {
        throw error
    }
}

module.exports = {createPorcion, readPorciones, readPorcion, updatePorcion, deletePorcion, existsPorcion}
