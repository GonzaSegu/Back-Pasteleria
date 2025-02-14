const Ordenes = require('../models/Ordenes')

const handleCreateOrden = async (req, res, next) => {
    try {
        const { user_id, estado_id, detalle_orden } = req.body;
        if (!user_id || !estado_id || !Array.isArray(detalle_orden)) {
            throw new Error("INVALID_PARAMETERS");
        }
        const response = await Ordenes.createOrden(user_id, estado_id, detalle_orden);
        res.json({
            msg:"Orden creada y Detalle_Orden creados",
            data: response
        });
    } catch (error) {
        next(error);
    }
}
const handleReadOrdenes = async (req, res, next) => {
    try {
        const response = await Ordenes.readOrdenes();
        res.json({
            msg: "Lista de ordenes",
            data: response
        });
    } catch (error) {
        next(error);
    }
};

const handleReadOrden = async (req, res, next) => {
    try {
        const { id } = req.params;
        const exists = await Ordenes.existsOrden(id)
        if (!exists) {
            throw new Error( 'ID_NOT_FOUND', { cause: 'Error en la base de datos' })
        }
        const response = await Ordenes.readOrden(id);
        res.json({
            msg: "Orden por id",
            data: response
        });
    } catch (error) {
        next(error);
    }
};

const handleUpdateOrden = async (req, res, next) => {
    try {
        const { id } = req.params;
        const exists = await Ordenes.existsOrden(id)
        if (!exists) {
            throw new Error( 'ID_NOT_FOUND', { cause: 'Error en la base de datos' })
        }
        const { estado_id } = req.body;
        
        const response = await Ordenes.updateOrden(id, estado_id);
        res.json({
            msg: "Orden actualizada",
            data: response
        });
    } catch (error) {
        next(error);
    }
};

const handleDeleteOrden = async (req, res, next) => {
    try {
        const { id } = req.params;
        const exists = await Ordenes.existsOrden(id)
        if (!exists) {
            throw new Error( 'ID_NOT_FOUND', { cause: 'Error en la base de datos' })
        }
        const response = await Ordenes.deleteOrden(id);
        res.json({
            msg: "Orden eliminada",
            data: response
        });
    } catch (error) {
        next(error);
    }
};

const handleReadOrdenDetalles = async (req, res, next) => {
    try {
        const response = await Ordenes.readOrdenDetalles();
        res.json({
            msg: "Listado de ordenes con detalle",
            data: response
        });
    } catch (error) {
        next(error);
    }
};

const handleReadOrdenDetalle = async (req, res, next) => {
    try {
        const { id } = req.params;
        const exists = await Ordenes.existsOrden(id)
        if (!exists) {
            throw new Error( 'ID_NOT_FOUND', { cause: 'Error en la base de datos' })
        }
        const response = await Ordenes.readOrdenDetalle(id);
        res.json({
            msg: "Orden por id con detalle",
            data: response
        });
    } catch (error) {
        next(error);
    }
};




module.exports = { handleCreateOrden, handleReadOrdenes, handleReadOrden, handleUpdateOrden, handleDeleteOrden, handleReadOrdenDetalles, handleReadOrdenDetalle };
