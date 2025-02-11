const {Router} = require('express')
const FormasController  = require('../controllers/formas.controller')
const {authMiddleware, verifyRole } = require('../middlewares/authMiddleware')

const router = Router()

// 🔒 Solo administradores pueden crear formas
router.post("/", authMiddleware, verifyRole([1]), FormasController.handleCreateForma)

// 🟢 Cualquier usuario puede ver las formas
router.get ("/", FormasController.handleReadFormas)
router.get("/:id", FormasController.handleReadForma)

// 🔒 Solo administradores pueden actualizar o eliminar Formas
router.put("/:id", authMiddleware, verifyRole([1]), FormasController.handleUpdateForma)
router.delete("/:id", authMiddleware, verifyRole([1]), FormasController.handleDeleteForma)

module.exports = router;