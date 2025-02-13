const {Router} = require('express')
const AuthController = require('../controllers/auth.controller')
const {authMiddleware, verifyRole } = require('../middlewares/authMiddleware')
const router = Router()

router.post("/login", AuthController.handleLogin)
router.post("/register", AuthController.handleRegister)                     //Create usuarios

// [1]: Admin     [2]: User (Usuario Cliente)
// 🔵 Usuarios autenticados pueden acceder
router.get("/me", authMiddleware, AuthController.handleAuth)

// 🔒 Solo admin
router.get("/", authMiddleware, verifyRole([1]), AuthController.handleReadUsuarios)         //2Read usuarios 
router.get("/:id", authMiddleware, verifyRole([1]), AuthController.handleReadUsuario)       //2Read usuario por id

// 🔵 Usuarios autenticados pueden actualizar su info
router.put("/:id", authMiddleware, verifyRole([2]), AuthController.handleUpdateUsuario)      //Update usuario

// 🔒 Solo admin puede cambiar el rol y otros datos críticos
router.put("/admin/:id", authMiddleware, verifyRole([1]), AuthController.handleUpdateAdmin) //2Update usuario

// 🔒 Solo admin puede eliminar usuarios
router.delete("/:id", authMiddleware, verifyRole([1]), AuthController.handleDeleteUsuario)   //2Delete usuario

module.exports = router;
