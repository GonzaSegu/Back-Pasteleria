const {Router} = require('express')
const PorcionesController  = require('../controllers/porciones.controller')
const {authMiddleware, verifyRole } = require('../middlewares/authMiddleware')

const router = Router()

// 🔒 Solo administradores pueden crear porciones
router.post("/", authMiddleware, verifyRole([1]), PorcionesController.handleCreatePorcion)

// 🟢 Cualquier usuario puede ver las porciones
router.get ("/", PorcionesController.handleReadPorciones)
router.get("/:id", PorcionesController.handleReadPorcion)

// 🔒 Solo administradores pueden actualizar o eliminar porciones
router.put("/:id", authMiddleware, verifyRole([1]), PorcionesController.handleUpdatePorcion)
router.delete("/:id", authMiddleware, verifyRole([1]), PorcionesController.handleDeletePorcion)

module.exports = router;