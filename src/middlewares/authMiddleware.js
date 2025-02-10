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
  
      const usuario = await Auth.obtenerUsuario(decoded.email)
      ;
      if (!usuario) {
        return res.status(401).json({ error: "Usuario no encontrado" });
      }
  
      req.user = usuario; // Guardamos los datos del usuario en `req.user`
      next(); // Continuamos con la ejecución
    } catch (error) {
      res.status(401).json({ error: "Token inválido o expirado" });
    }
  };

// Verificación de permisos
const verifyRole = (rolesPermitidos) => {
  return (req, res, next) => {
      if (!req.user) {
          return res.status(401).json({ error: "No autorizado" });
      }

      if (!rolesPermitidos.includes(req.user.rol_id)) {
          return res.status(403).json({ error: "No tienes permiso para realizar esta acción" });
      }

      next(); // Si el usuario tiene permiso, continua con la ejecución
  };
};

module.exports = { authMiddleware, verifyRole };