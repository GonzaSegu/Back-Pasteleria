const Comunas = require('../models/Comunas')

const handleReadComunas = async (req, res, next) => {
    try {
        const response = await Comunas.readComunas()
        res.json({
            msg: "Lista de comunas",
            data: response
        })
    } catch (error) {
        next(error);
    }
}

const handleReadComuna = async (req, res, next) => {
    try {
        const { id } = req.params
        const exists = await Comunas.existsComuna(id)
        if (!exists) {
            throw new Error( 'ID_NOT_FOUND', { cause: 'Error en la base de datos' })
        }
        const response = await Comunas.readComuna(id)
        res.json({
            msg: "Comuna por id",
            data: response
        })
    } catch (error) {
        next(error);
    }
}

module.exports = { handleReadComunas, handleReadComuna }