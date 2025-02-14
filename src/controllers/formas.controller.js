const Formas = require('../models/Formas')

const handleCreateForma = async (req, res, next) => {
    try {
        const {nombre_forma} = req.body
        const response = await Formas.createForma(nombre_forma)
        res.json({
            msg: "Forma creada",
            data: response
        })
    } catch (error) {
        next(error);
    }
}

const handleReadFormas = async (req, res, next) => {
    try {
        const response = await Formas.readFormas()
        res.json({
            msg: "Lista de formas",
            data: response
        })
    } catch (error) {
        next(error);
    }
}

const handleReadForma = async (req, res, next) => {
    try {
        const { id } = req.params
        const exists = await Formas.existsForma(id)
        if (!exists) {
            throw new Error( 'ID_NOT_FOUND', { cause: 'Error en la base de datos' })
        }
        const response = await Formas.readForma(id)
        res.json({
            msg: "Forma por id",
            data: response
        })
    } catch (error) {
        next(error);
    }
}

const handleUpdateForma = async (req, res, next) => {
    try {
        const { id } = req.params
        const exists = await Formas.existsForma(id)
        if (!exists) {
            throw new Error( 'ID_NOT_FOUND', { cause: 'Error en la base de datos' })
        }
        const { nombre_forma } = req.body
        const response = await Formas.updateForma(id, nombre_forma)
        res.json({
            msg: "Nombre Forma actualizada",
            data: response
        })
    } catch (error) {
        next(error);
    }
}

const handleDeleteForma = async (req, res, next) => {
    try {
        const { id } = req.params
        const exists = await Formas.existsForma(id)
        if (!exists) {
            throw new Error( 'ID_NOT_FOUND', { cause: 'Error en la base de datos' })
        }
        const response = await Formas.deleteForma(id)
        res.json({
            msg: "Forma eliminada",
            data: response
        })
    
    } catch (error) {
        next(error);
    }
}


module.exports = {handleCreateForma, handleReadFormas, handleReadForma, handleUpdateForma, handleDeleteForma}