const Productos = require('../models/Productos')

const handleCreateProduct = async (req, res) => {
    try {
        const {nombre_producto, precio, stock, imagen_url, azucar, gluten, lactosa, forma_id, categoria_id, porcion_id} = req.body
        const response = await Productos.createProduct(nombre_producto, precio, stock, imagen_url, azucar, gluten, lactosa, forma_id, categoria_id, porcion_id)
        res.json({
            msg: "Producto creado",
            data: response
        })
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}


const handleReadProducts = async (req, res) => {
    try {
        const { limit, order_by, page } = req.query
        const response = await Productos.readProducts(limit, order_by, page)
        res.json({
            msg: "Lista de productos",
            data: response
        })
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const handleReadProduct = async (req, res) => {
    try {
        const { id } = req.params
        //const authorization = req.header('Authorization')
        //if (!authorization) {
        //    throw { code: 401, message: "Falta el token de autorización" };
        //}
        const response = await Productos.readProduct(id)
        res.json({
            msg: "Producto por id",
            data: response
        })
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}


const handleUpdateProduct = async (req, res) => {
    try {
        const { id } = req.params
        const {nombre_producto, precio, stock, imagen_url, azucar, gluten, lactosa, forma_id, categoria_id, porcion_id} = req.body
        const response = await Productos.updateProduct(id, nombre_producto, precio, stock, imagen_url, azucar, gluten, lactosa, forma_id, categoria_id, porcion_id)
        res.json({
            msg: "Producto actualizado",
            data: response
        })
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}


const handleDeleteProduct = async (req, res) => {
    try {
        const { id } = req.params
        const exists = await Productos.existsProduct(id)
        if (!exists) {
            throw new Error(
                'PRODUCT_NOT_FOUND',
                { cause: 'Error en la base de datos' }
            )
        }
        const response = await Productos.deleteProduct(id)
        res.json({
            msg: "Producto eliminado",
            data: response
        })
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

module.exports = { handleCreateProduct, handleReadProducts, handleReadProduct, handleUpdateProduct, handleDeleteProduct }