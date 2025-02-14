const {Router} = require('express')
const ProductosController  = require('../controllers/productos.controller')
const {authMiddleware, verifyRole } = require('../middlewares/authMiddleware')

const router = Router()

// 🔒 Solo admin puede crear productos
router.post("/", authMiddleware, verifyRole([1]), ProductosController.handleCreateProduct)      //Create producto

// 🟢 Cualquier usuario puede ver los productos
router.get("/", ProductosController.handleReadProducts)        //Read productos
router.get("/filter", ProductosController.handleFilterProduct)   //Read producto filtrado
router.get("/:id", ProductosController.handleReadProduct)      //Read producto por id

// 🔒 Solo admin puede actualizar o eliminar productos
router.put("/:id", authMiddleware, verifyRole([1]), ProductosController.handleUpdateProduct)    //Update producto
router.delete("/:id", authMiddleware, verifyRole([1]), ProductosController.handleDeleteProduct) //Delete producto

module.exports = router;