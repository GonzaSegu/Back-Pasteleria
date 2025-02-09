const {Router} = require('express')
const AuthController = require('../controllers/auth.controller')
const {authMiddleware} = require('../middlewares/authMiddleware')
const router = Router()

router.post("/login", AuthController.handleLogin)
router.post("/register", AuthController.handleRegister)                     //Create usuarios
router.get("/me", authMiddleware, AuthController.handleAuth)
router.get("/", authMiddleware, AuthController.handleReadUsuarios)         //2Read usuarios 
router.get("/:id", authMiddleware, AuthController.handleReadUsuario)       //2Read usuario por id
router.put("/:id", authMiddleware, AuthController.handleUpdateUsuario)      //Update usuario
router.put("/admin/:id", authMiddleware, AuthController.handleUpdateAdmin) //2Update usuario
router.delete("/:id", authMiddleware,AuthController.handleDeleteUsuario)   //2Delete usuario

module.exports = router;
