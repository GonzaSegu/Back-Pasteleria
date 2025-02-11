const {Router} = require('express')
const CategoriasController  = require('../controllers/categorias.controller')
const {authMiddleware, verifyRole } = require('../middlewares/authMiddleware')

const router = Router()

// 🔒 Solo administradores pueden crear categorias
router.post("/", authMiddleware, verifyRole([1]), CategoriasController.handleCreateCategoria)

// 🟢 Cualquier usuario puede ver las categorias
router.get ("/", CategoriasController.handleReadCategorias)
router.get("/:id", CategoriasController.handleReadCategoria)

// 🔒 Solo administradores pueden actualizar o eliminar categorias
router.put("/:id", authMiddleware, verifyRole([1]), CategoriasController.handleUpdateCategoria)
router.delete("/:id", authMiddleware, verifyRole([1]), CategoriasController.handleDeleteCategoria)

module.exports = router;