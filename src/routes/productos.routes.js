const {Router} = require('express')
const ProductosController  = require('../controllers/productos.controller')
const {authMiddleware, verifyRole } = require('../middlewares/authMiddleware')

const router = Router()

// 🔒 Solo administradores pueden crear productos
router.post("/", authMiddleware, verifyRole([1]), ProductosController.handleCreateProduct)      //Create producto

// 🟢 Cualquier usuario puede ver los productos
router.get("/", ProductosController.handleReadProducts)        //Read productos
router.get("/:id", ProductosController.handleReadProduct)      //Read producto por id

// 🔒 Solo administradores pueden actualizar o eliminar productos
router.put("/:id", authMiddleware, verifyRole([1]), ProductosController.handleUpdateProduct)    //Update producto
router.delete("/:id", authMiddleware, verifyRole([1]), ProductosController.handleDeleteProduct) //Delete producto

module.exports = router;