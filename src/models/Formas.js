const pool = require('../config/db')
const format = require ('pg-format')

const createForma = async (nombre_forma) =>{
    try {
        const SQLQuery = format(`
            INSERT INTO forma
            (nombre_forma) 
            VALUES (%L) RETURNING *`, nombre_forma)
        const { rows : [newForma] } = await pool.query(SQLQuery)
        return newForma    
    
    } catch (error) {
        throw error
    } 
}

const readFormas = async () => {
    try {
        const SQLQuery = format (`
            SELECT * FROM forma order by nombre_forma
            `)
        const {rows: formas , rowCount } = await pool.query(SQLQuery)
        return { formas, rowCount}
    
    } catch (error) {
        throw error
    }
}

const readForma = async (id) => {
    try {
        const SQLQuery = format(`
        SELECT * from forma WHERE id = %s`, id)
        const { rows: [forma] } = await pool.query(SQLQuery)
        return forma
    
    } catch (error) {
        throw error
    }
 }

const updateForma = async (id, nombre_forma) => {
    try {
        const SQLQuery = format(`
        UPDATE forma SET nombre_forma = %L WHERE id = %s RETURNING *`, 
        nombre_forma, id)

        const { rows: [updatedForma] } = await pool.query(SQLQuery)
        return updatedForma
    
    } catch (error) {
        throw error
    }
}

const deleteForma = async (id) => {
    try {
        const SQLQuery = format(`
            DELETE FROM forma WHERE id = %L RETURNING *`, id)
        
        const { rows : [deletedForma] } = await pool.query(SQLQuery)
        return deletedForma
    } catch (error) {
        throw error
    }
}

const existsForma = async (id) => {
    try {
        const SQLQuery = format('SELECT * FROM forma WHERE id = %L', id)
        const { rowCount } = await pool.query(SQLQuery)
        return rowCount ? true : false
    } catch (error) {
        throw error
    }
}

module.exports = {createForma, readFormas, readForma, updateForma, deleteForma, existsForma}
