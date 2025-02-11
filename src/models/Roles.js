const pool = require('../config/db')
const format = require ('pg-format')

const createRol = async (nombre_rol) =>{
    try {
        const SQLQuery = format(`
            INSERT INTO rol
            (nombre_rol) 
            VALUES (%L) RETURNING *`, nombre_rol)
        const { rows : [newRol] } = await pool.query(SQLQuery)
        return newRol    
    
    } catch (error) {
        throw error
    } 
}

const readRoles = async () => {
    try {
        const SQLQuery = format (`
            SELECT * FROM rol order by nombre_rol
            `)
        const {rows: roles , rowCount } = await pool.query(SQLQuery)
        return { roles, rowCount}
    
    } catch (error) {
        throw error
    }
}

const readRol = async (id) => {
    try {
        const SQLQuery = format(`
        SELECT * from rol WHERE id = %s`, id)
        const { rows: [rol] } = await pool.query(SQLQuery)
        return rol
    
    } catch (error) {
        throw error
    }
 }

const updateRol = async (id, nombre_rol) => {
    try {
        const SQLQuery = format(`
        UPDATE rol SET nombre_rol = %L WHERE id = %s RETURNING *`, 
        nombre_rol, id)

        const { rows: [updatedRol] } = await pool.query(SQLQuery)
        return updatedRol
    
    } catch (error) {
        throw error
    }
}

const deleteRol = async (id) => {
    try {
        const SQLQuery = format(`
            DELETE FROM rol WHERE id = %L RETURNING *`, id)
        
        const { rows : [deletedRol] } = await pool.query(SQLQuery)
        return deletedRol
    } catch (error) {
        throw error
    }
}

const existsRol = async (id) => {
    try {
        const SQLQuery = format('SELECT * FROM rol WHERE id = %L', id)
        const { rowCount } = await pool.query(SQLQuery)
        return rowCount ? true : false
    } catch (error) {
        throw error
    }
}

module.exports = {createRol, readRoles, readRol, updateRol, deleteRol, existsRol}
