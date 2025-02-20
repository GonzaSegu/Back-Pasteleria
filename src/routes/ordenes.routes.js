const {Router} = require('express')
const OrdenesController = require('../controllers/ordenes.controller')
const {authMiddleware, verifyRole } = require('../middlewares/authMiddleware')

const router = Router()

// 🔵 Solo Usuarios autenticados pueden pueden crear ordenes
router.post("/", authMiddleware, OrdenesController.handleCreateOrden);

// 🔒 admin puede leer todas las ordenes y las ordenes con los detalles
router.get("/", authMiddleware, verifyRole([1]), OrdenesController.handleReadOrdenes);
router.get("/detalle/:ordenId", authMiddleware, verifyRole([1]), OrdenesController.handleReadOrdenDetalles);


// 🔵 Usuarios autenticados pueden leer una orden específica y una orden con sus detalles
router.get("/:id", authMiddleware, OrdenesController.handleReadOrden);
router.get("/:userId/detalle/:ordenId", authMiddleware, OrdenesController.handleReadOrdenDetalle);


// 🔒 Solo admin puede actualizar ordenes
router.put("/:id", authMiddleware, verifyRole([1]), OrdenesController.handleUpdateOrden);

// 🔒 Solo admin puede eliminar ordenes
router.delete("/:id", authMiddleware, verifyRole([1]), OrdenesController.handleDeleteOrden);


module.exports = router;