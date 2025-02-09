const helpers = require('../helpers/jwt')
const Auth = require('../models/Auth') // Función para buscar usuario en BD

const authMiddleware = async (req, res, next) => {
    try {
      const Authorization = req.header("Authorization");
      if (!Authorization || !Authorization.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Token inválido o ausente" });
      }
  
      const token = Authorization.split("Bearer ")[1];
      const decoded = helpers.verifyToken(token)
  
      const usuario = await Auth.obtenerUsuario(decoded.email);
      if (!usuario) {
        return res.status(401).json({ error: "Usuario no encontrado" });
      }
  
      req.user = usuario; // Guardamos los datos del usuario en `req.user`
      next(); // Continuamos con la ejecución
    } catch (error) {
      res.status(401).json({ error: "Token inválido o expirado" });
    }
  };
  
  module.exports = {authMiddleware};