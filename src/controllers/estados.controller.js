const Estados = require('../models/Estados')

const handleCreateEstado = async (req, res, next) => {
    try {
        const {nombre_estado} = req.body
        const response = await Estados.createEstado(nombre_estado)
        res.json({
            msg: "Estado creada",
            data: response
        })
    } catch (error) {
        next(error);
    }
}

const handleReadEstados = async (req, res, next) => {
    try {
        const response = await Estados.readEstados()
        res.json({
            msg: "Lista de estados",
            data: response
        })
    } catch (error) {
        next(error);
    }
}

const handleReadEstado = async (req, res, next) => {
    try {
        const { id } = req.params
        const exists = await Estados.existsEstado(id)
        if (!exists) {
            throw new Error( 'ID_NOT_FOUND', { cause: 'Error en la base de datos' })
        }
        const response = await Estados.readEstado(id)
        res.json({
            msg: "Estado por id",
            data: response
        })
    } catch (error) {
        next(error);
    }
}

const handleUpdateEstado = async (req, res, next) => {
    try {
        const { id } = req.params
        const exists = await Estados.existsEstado(id)
        if (!exists) {
            throw new Error( 'ID_NOT_FOUND', { cause: 'Error en la base de datos' })
        }
        const { nombre_estado } = req.body
        const response = await Estados.updateEstado(id, nombre_estado)
        res.json({
            msg: "Nombre Estado actualizada",
            data: response
        })
    } catch (error) {
        next(error);
    }
}

const handleDeleteEstado = async (req, res, next) => {
    try {
        const { id } = req.params
        const exists = await Estados.existsEstado(id)
        if (!exists) {
            throw new Error( 'ID_NOT_FOUND', { cause: 'Error en la base de datos' })
        }
        const response = await Estados.deleteEstado(id)
        res.json({
            msg: "Estado eliminada",
            data: response
        })
    
    } catch (error) {
        next(error);
    }
}


module.exports = {handleCreateEstado, handleReadEstados, handleReadEstado, handleUpdateEstado, handleDeleteEstado}