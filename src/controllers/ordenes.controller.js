const Ordenes = require('../models/Ordenes')
const Productos = require('../models/Productos')
const Auth = require('../models/Auth')


const { getHeadersToken, decodeToken, verifyToken } = require('../helpers/jwt')

const handleCreateOrden = async (req, res, next) => {
    try {
        const { user_id, estado_id, detalle_orden } = req.body;
        if (!user_id || !estado_id || !Array.isArray(detalle_orden)) {
            throw new Error("INVALID_PARAMETERS");
        }
        const response = await Ordenes.createOrden(user_id, estado_id, detalle_orden);
        res.json({
            msg: "Orden registarda con éxito",
            data: response
        });
    } catch (error) {
        next(error);
    }
}
const handleReadOrdenes = async (req, res, next) => {
    try {
        const { limit, order_by, page } = req.query;

        const response = await Ordenes.readOrdenes(limit, order_by, page);

        res.status(200).json({
            msg: 'Listado de ordenes',
            data: {
                total: response.total,
                results: response.results,
                pagination: response.pagination
            }
        })
    } catch (error) {
        next(error);
    }
};

const handleReadOrden = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { limit, order_by, page } = req.query;

        const exists = await Auth.existsUser(id)
        if (!exists) {
            throw new Error('ID_NOT_FOUND', { cause: 'Error en la base de datos' })
        }

        const response = await Ordenes.readOrden(id, limit, order_by, page);

        res.status(200).json({
            msg: 'Listado de ordenes por usuario',
            data: response
        })
    } catch (error) {
        next(error);
    }
};

const handleUpdateOrden = async (req, res, next) => {
    try {
        const { id } = req.params;
        const exists = await Ordenes.existsOrden(id)
        if (!exists) {
            throw new Error('ID_NOT_FOUND', { cause: 'Error en la base de datos' })
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
            throw new Error('ID_NOT_FOUND', { cause: 'Error en la base de datos' })
        }

        const token = getHeadersToken(req)
        verifyToken(token)
        const { email } = decodeToken(token)

        const response = await Ordenes.deleteOrden(id);

        res.json({
            msg: `El usuario ${email} ha eliminado la orden de id ${id}`,
            data: response
        });
    } catch (error) {
        next(error);
    }
};

const handleReadOrdenDetalles = async (req, res, next) => {
    try {
        const { ordenId } = req.params;
        console.log("Orden ID recibido:", ordenId);

        const response = await Ordenes.readOrdenDetalles(ordenId);

        res.status(200).json({
            msg: 'Listado de ordenes con detalle según detalle ID',
            data: response
        })


    } catch (error) {
        next(error);
    }
};

const handleReadOrdenDetalle = async (req, res, next) => {
    try {
        const { userId, ordenId } = req.params;

        const exists = await Ordenes.existsOrden(ordenId)

        if (!exists) {
            throw new Error('ID_ORDER_ID_FOUND', { cause: 'Error en la base de datos' })
        }
        const existsUserId = await Productos.existsProduct(userId)

        if (!existsUserId) {
            throw new Error('ID_NOT_FOUND', { cause: 'Error en la base de datos' })
        }

        const response = await Ordenes.readOrdenDetalle(userId, ordenId);

        res.status(200).json({
            msg: 'Detalle según user_id y id de la order',
            data: response
        })

    } catch (error) {
        next(error);
    }
};




module.exports = { handleCreateOrden, handleReadOrdenes, handleReadOrden, handleUpdateOrden, handleDeleteOrden, handleReadOrdenDetalles, handleReadOrdenDetalle };
