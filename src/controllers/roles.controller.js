const Roles = require('../models/Roles')

const handleCreateRol = async (req, res, next) => {
    try {
        const {nombre_rol} = req.body
        const response = await Roles.createRol(nombre_rol)
        res.json({
            msg: "Rol creada",
            data: response
        })
    } catch (error) {
        next(error);
    }
}

const handleReadRoles = async (req, res, next) => {
    try {
        const response = await Roles.readRoles()
        res.json({
            msg: "Lista de roles",
            data: response
        })
    } catch (error) {
        next(error);
    }
}

const handleReadRol = async (req, res, next) => {
    try {
        const { id } = req.params
        const exists = await Roles.existsRol(id)
        if (!exists) {
            throw new Error( 'ID_NOT_FOUND', { cause: 'Error en la base de datos' })
        }
        const response = await Roles.readRol(id)
        res.json({
            msg: "Rol por id",
            data: response
        })
    } catch (error) {
        next(error);
    }
}

const handleUpdateRol = async (req, res, next) => {
    try {
        const { id } = req.params
        const exists = await Roles.existsRol(id)
        if (!exists) {
            throw new Error( 'ID_NOT_FOUND', { cause: 'Error en la base de datos' })
        }
        const { nombre_rol } = req.body
        const response = await Roles.updateRol(id, nombre_rol)
        res.json({
            msg: "Nombre Rol actualizada",
            data: response
        })
    } catch (error) {
        next(error);
    }
}

const handleDeleteRol = async (req, res, next) => {
    try {
        const { id } = req.params
        const exists = await Roles.existsRol(id)
        if (!exists) {
            throw new Error( 'ID_NOT_FOUND', { cause: 'Error en la base de datos' })
        }
        const response = await Roles.deleteRol(id)
        res.json({
            msg: "Rol eliminada",
            data: response
        })
    
    } catch (error) {
        next(error);
    }
}


module.exports = {handleCreateRol, handleReadRoles, handleReadRol, handleUpdateRol, handleDeleteRol}