const {Router} = require('express')
const ProductosController  = require('../controllers/productos.controller')

const router = Router()

router.post("/", ProductosController.handleCreateProduct)      //Create producto
router.get("/", ProductosController.handleReadProducts)        //Read productos
router.get("/:id", ProductosController.handleReadProduct)      //Read producto por id
router.put("/:id", ProductosController.handleUpdateProduct)    //Update producto
router.delete("/:id", ProductosController.handleDeleteProduct) //Delete producto

module.exports = router;