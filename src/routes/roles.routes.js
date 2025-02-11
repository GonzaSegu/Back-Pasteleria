const {Router} = require('express')
const RolesController  = require('../controllers/roles.controller')
const {authMiddleware, verifyRole } = require('../middlewares/authMiddleware')

const router = Router()

// 🔒 Solo administradores pueden crear roles
router.post("/", authMiddleware, verifyRole([1]), RolesController.handleCreateRol)

// 🟢 Cualquier usuario puede ver las roles
router.get ("/", RolesController.handleReadRoles)
router.get("/:id", RolesController.handleReadRol)

// 🔒 Solo administradores pueden actualizar o eliminar roles
router.put("/:id", authMiddleware, verifyRole([1]), RolesController.handleUpdateRol)
router.delete("/:id", authMiddleware, verifyRole([1]), RolesController.handleDeleteRol)

module.exports = router;