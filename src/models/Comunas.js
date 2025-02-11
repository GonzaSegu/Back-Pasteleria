const pool = require('../config/db')
const format = require ('pg-format')

const readComunas = async () => {
    try {
        const SQLQuery = format(`
            SELECT 
                c.id, 
                c.nombre_comuna AS nombre_comuna, 
                r.id AS region_id, 
                r.nombre_region AS region
            FROM comuna c
            INNER JOIN region r ON c.region_id = r.id
            ORDER BY c.nombre_comuna`)
        const {rows: comunas , rowCount } = await pool.query(SQLQuery)
        return { comunas, rowCount }
    
    } catch (error) {
        throw error
    }
}

const readComuna = async (id) => {
    try {
        const SQLQuery = format(`
            SELECT 
                c.id, 
                c.nombre_comuna AS nombre_comuna, 
                r.id AS region_id, 
                r.nombre_region AS region
            FROM comuna c
            INNER JOIN region r ON c.region_id = r.id
            WHERE c.id = %L`, 
            id)
        const { rows: [comuna] } = await pool.query(SQLQuery)
        return comuna
    
    } catch (error) {
        throw error
    }
}

module.exports = { readComunas, readComuna }
