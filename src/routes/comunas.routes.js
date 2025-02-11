const {Router} = require('express')
const ComunasController  = require('../controllers/comunas.controller')
const {authMiddleware, verifyRole } = require('../middlewares/authMiddleware')

const router = Router()

// 🟢 Cualquier usuario puede ver las comunas
router.get ("/", ComunasController.handleReadComunas)
router.get("/:id", ComunasController.handleReadComuna)


module.exports = router;