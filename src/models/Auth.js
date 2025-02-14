const { hashPassword, verifyPassword } = require('../helpers/bcrypt')
const pool = require('../config/db')
const format = require('pg-format')

const register = async (nombre, apellido, telefono, comuna_id, direccion, email, password, rol_id= 2) => { 
    try {
        // Hashear la contraseña de forma síncrona
        const passwordHashed = hashPassword(password);
        const SQLQuery = format(`
            INSERT INTO usuario (nombre, apellido, telefono, comuna_id, direccion, email, password, rol_id) 
            VALUES (%L, %L, %L, %L, %L, %L, %L, %L) RETURNING *`,
            nombre, apellido, telefono, comuna_id, direccion, email, passwordHashed, rol_id
        );
        const { rows: [newUser] } = await pool.query(SQLQuery);   
        if (!newUser) {
            throw new Error("REGISTER_ERROR");
        }  
        return newUser;
    } catch (error) {
        throw error;
    }
};

const verificarCredenciales = async (email, password) => {  
    try {
        const SQLQuery = format(
            `SELECT * FROM usuario WHERE email = %L`, email
        );
        const { rows: [usuario], rowCount } = await pool.query(SQLQuery)
        if(!rowCount) {
            throw new Error('USER_NOT_FOUND')
        }
        const { password: passwordHashed } = usuario
        const match = verifyPassword(password, passwordHashed)
        if (!match) {
            throw new Error('INVALID_CREDENTIALS')
        }
        console.log(usuario)
        return usuario

    } catch (error) {
        throw error
    }
}


const obtenerUsuario = async (email) => {
    try {
        const SQLQuery = format(
            `SELECT * FROM usuario WHERE email = %L`, email
        );
        const { rows: [user], rowCount } = await pool.query(SQLQuery)
        if (rowCount === 0) {
            throw new Error("USER_NOT_FOUND");
    }
    return user;

    } catch (error) {
       throw error 
    }
};


const readUsuarios = async () => {
    try {
        const SQLQuery = format('SELECT * FROM usuario')
        const { rows: users , rowCount } = await pool.query(SQLQuery)
        return { users, rowCount}
    } catch (error) {
        throw error
    }
}

const readUsuario = async (id) => {
    try {
        const SQLQuery = format('SELECT * FROM usuario WHERE id = %L', id)
        const { rows : [user] } = await pool.query(SQLQuery)
        if (!user) {
            throw new Error('USER_NOT_FOUND');
        }
        return user
    } catch (error) {
        throw error
    }
}

const updateUsuario = async (id, nombre, apellido, telefono, comuna_id, direccion)  => {
    try {
        const SQLQuery = format(`
            UPDATE usuario 
            SET nombre = %L, apellido = %L, telefono = %L, comuna_id = %L, direccion = %L  
            WHERE id = %L RETURNING *`,
            nombre, apellido, telefono, comuna_id, direccion, id
        );
        const { rows: [updatedUser] } = await pool.query(SQLQuery);   
        if (!updatedUser) {
            throw new Error("UPDATE_ERROR");
        }  
        return updatedUser;  
    } catch (error) {
        throw error
    }
}

const updateAdmin = async (id, nombre, apellido, telefono, comuna_id, direccion, rol_id)  => {
    try {
        const SQLQuery = format(`
            UPDATE usuario 
            SET nombre = %L, apellido = %L, telefono = %L, comuna_id = %L, direccion = %L, rol_id = %L
            WHERE id = %L RETURNING *`,
            nombre, apellido, telefono, comuna_id, direccion, rol_id, id
        );
        const { rows: [updatedUser] } = await pool.query(SQLQuery);   
        if (!updatedUser) {
            throw new Error("UPDATE_ERROR");
        }  
        return updatedUser;  
    } catch (error) {
        throw error
    }
}


const deleteUsuario = async (id) => {
    try {
        const SQLQuery = format(`
            DELETE FROM usuario WHERE id = %L RETURNING *`, 
            id
        );
        const { rows: [deletedUser]} = await pool.query(SQLQuery)
        if (!deletedUser) {
            throw new Error('USER_NOT_FOUND');
        }
        return deletedUser //devuelve al cliente el registro eliminado
    } catch (error) {
        throw error
    }
}

const existsEmail = async (email) => {
    try {   
        const SQLQuery = format(`
            SELECT * FROM usuario 
            WHERE email = %L`,
            email
        );
        const { rowCount } = await pool.query(SQLQuery)
        return rowCount ? true : false
    } catch (error) {
        console.error('Error en exists:', error)
        throw error
    }
}

const existsUser = async (id) => {
    try {
        const SQLQuery = format('SELECT * FROM usuario WHERE id = %L', id)
        const { rowCount } = await pool.query(SQLQuery)
        return rowCount ? true : false

    } catch (error) {
        throw error
    }
}

module.exports = {verificarCredenciales, register, obtenerUsuario, readUsuarios, readUsuario, updateUsuario, updateAdmin, deleteUsuario, existsEmail, existsUser}