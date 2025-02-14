const Porciones = require('../models/Porciones')

const handleCreatePorcion = async (req, res, next) => {
    try {
        const {nombre_porcion} = req.body
        const response = await Porciones.createPorcion(nombre_porcion)
        res.json({
            msg: "Porcion creada",
            data: response
        })
    } catch (error) {
        next(error);
    }
}

const handleReadPorciones = async (req, res, next) => {
    try {
        const response = await Porciones.readPorciones()
        res.json({
            msg: "Lista de porciones",
            data: response
        })
    } catch (error) {
        next(error);
    }
}

const handleReadPorcion = async (req, res, next) => {
    try {
        const { id } = req.params
        const exists = await Porciones.existsPorcion(id)
        if (!exists) {
            throw new Error( 'ID_NOT_FOUND', { cause: 'Error en la base de datos' })
        }
        const response = await Porciones.readPorcion(id)
        res.json({
            msg: "Porcion por id",
            data: response
        })
    } catch (error) {
        next(error);
    }
}

const handleUpdatePorcion = async (req, res, next) => {
    try {
        const { id } = req.params
        const exists = await Porciones.existsPorcion(id)
        if (!exists) {
            throw new Error( 'ID_NOT_FOUND', { cause: 'Error en la base de datos' })
        }
        const { nombre_porcion } = req.body
        const response = await Porciones.updatePorcion(id, nombre_porcion)
        res.json({
            msg: "Nombre Porcion actualizada",
            data: response
        })
    } catch (error) {
        next(error);
    }
}

const handleDeletePorcion = async (req, res, next) => {
    try {
        const { id } = req.params
        const exists = await Porciones.existsPorcion(id)
        if (!exists) {
            throw new Error( 'ID_NOT_FOUND', { cause: 'Error en la base de datos' })
        }
        const response = await Porciones.deletePorcion(id)
        res.json({
            msg: "Porcion eliminada",
            data: response
        })
    
    } catch (error) {
        next(error);
    }
}


module.exports = {handleCreatePorcion, handleReadPorciones, handleReadPorcion, handleUpdatePorcion, handleDeletePorcion}