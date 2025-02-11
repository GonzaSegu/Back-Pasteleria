const {Router} = require('express')
const EstadosController  = require('../controllers/estados.controller')
const {authMiddleware, verifyRole } = require('../middlewares/authMiddleware')

const router = Router()

// 🔒 Solo administradores pueden crear estados
router.post("/", authMiddleware, verifyRole([1]), EstadosController.handleCreateEstado)

// 🟢 Cualquier usuario puede ver las estados
router.get ("/", EstadosController.handleReadEstados)
router.get("/:id", EstadosController.handleReadEstado)

// 🔒 Solo administradores pueden actualizar o eliminar estados
router.put("/:id", authMiddleware, verifyRole([1]), EstadosController.handleUpdateEstado)
router.delete("/:id", authMiddleware, verifyRole([1]), EstadosController.handleDeleteEstado)

module.exports = router;