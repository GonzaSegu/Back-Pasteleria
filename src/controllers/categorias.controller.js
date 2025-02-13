const Categorias = require('../models/Categorias')

const handleCreateCategoria = async (req, res, next) => {
    try {
        const {nombre_categoria} = req.body
        const response = await Categorias.createCategoria(nombre_categoria)
        res.json({
            msg: "Categoria creada",
            data: response
        })
    } catch (error) {
        next(error);
    }
}

const handleReadCategorias = async (req, res, next) => {
    try {
        const response = await Categorias.readCategorias()
        res.json({
            msg: "Lista de categorias",
            data: response
        })
    } catch (error) {
        next(error);
    }
}

const handleReadCategoria = async (req, res, next) => {
    try {
        const { id } = req.params
        const exists = await Categorias.existsCategoria(id)
        if (!exists) {
            throw new Error( 'ID_NOT_FOUND', { cause: 'Error en la base de datos' })
        }
        const response = await Categorias.readCategoria(id)
        res.json({
            msg: "Categoria por id",
            data: response
        })
    } catch (error) {
        next(error);
    }
}

const handleUpdateCategoria = async (req, res, next) => {
    try {
        const { id } = req.params
        const exists = await Categorias.existsCategoria(id)
        if (!exists) {
            throw new Error( 'ID_NOT_FOUND', { cause: 'Error en la base de datos' })
        }
        const { nombre_categoria } = req.body
        const response = await Categorias.updateCategoria(id, nombre_categoria)
        res.json({
            msg: "Nombre Categoria actualizada",
            data: response
        })
    } catch (error) {
        next(error);
    }
}

const handleDeleteCategoria = async (req, res, next) => {
    try {
        const { id } = req.params
        const exists = await Categorias.existsCategoria(id)
        if (!exists) {
            throw new Error( 'ID_NOT_FOUND', { cause: 'Error en la base de datos' })
        }
        const response = await Categorias.deleteCategoria(id)
        res.json({
            msg: "Categoria eliminada",
            data: response
        })
    
    } catch (error) {
        next(error);
    }
}


module.exports = {handleCreateCategoria, handleReadCategorias, handleReadCategoria, handleUpdateCategoria, handleDeleteCategoria}