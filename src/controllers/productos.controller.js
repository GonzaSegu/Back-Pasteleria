const Productos = require('../models/Productos')

const handleCreateProduct = async (req, res, next) => {
    try {
        const {nombre_producto, precio, stock, imagen_url, azucar, gluten, lactosa, forma_id, categoria_id, porcion_id} = req.body
        const response = await Productos.createProduct(nombre_producto, precio, stock, imagen_url, azucar, gluten, lactosa, forma_id, categoria_id, porcion_id)
        res.json({
            msg: "Producto creado",
            data: response
        })
    } catch (error) {
        next(error);
    }
}


const handleReadProducts = async (req, res, next) => {
    try {
        const { limit, order_by, page } = req.query
        const response = await Productos.readProducts(limit, order_by, page)

        res.json({
            msg: 'Listado de productos',
            data: {
                total: response.total,
                results: response.results,
                pagination: response.pagination
            }
        })
    } catch (error) {
        next(error);
    }
}

const handleReadProduct = async (req, res, next) => {
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
        next(error);
    }
}


const handleUpdateProduct = async (req, res, next) => {
    try {
        const { id } = req.params
        const {nombre_producto, precio, stock, imagen_url, azucar, gluten, lactosa, forma_id, categoria_id, porcion_id} = req.body
        const response = await Productos.updateProduct(id, nombre_producto, precio, stock, imagen_url, azucar, gluten, lactosa, forma_id, categoria_id, porcion_id)
        res.json({
            msg: "Producto actualizado",
            data: response
        })
    } catch (error) {
        next(error);
    }
}


const handleDeleteProduct = async (req, res, next) => {
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
        next(error);
    }
}

const handleFilterProduct = async (req, res, next) => {
    try {
        const { categoria_id, azucar, gluten, lactosa } = req.query
        const response = await Productos.getProductFilter(categoria_id, azucar, gluten, lactosa);
        
        res.json({
            msg: 'Listado de productos filtrados',
            data: {
                total: response.total,
                results: response.results,
                pagination: response.pagination
            }
        });
    } catch (error) {
        next(error);
    }
}


module.exports = { handleCreateProduct, handleReadProducts, handleReadProduct, handleUpdateProduct, handleDeleteProduct, handleFilterProduct }