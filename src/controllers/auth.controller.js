const { signToken } = require('../helpers/jwt')
const Auth = require('../models/Auth')


// REGISTER - LOGIN - AUTH
const handleRegister = async (req, res, next) => {
    try {                          
        const { nombre, apellido, telefono, comuna_id, direccion, email, password, rol_id } = req.body;
        const exists = await Auth.existsEmail(email);
        if (exists) {
            return res.status(400).json({ error: "Email ya registrado" });
        }
        const response = await Auth.register(nombre, apellido, telefono, comuna_id, direccion, email, password, rol_id);
        res.status(201).json({
            msg: "Registro Creado",
            data: response
        });
    } catch (error) {
        next(error); // Enviar el error al middleware de manejo de errores
    }
};

const handleLogin = async (req, res, next) => {
    try{                          
        const { email, password } = req.body
        const user = await Auth.verificarCredenciales(email, password)
        const data = {
            email:user.email, 
            rol_id: user.rol_id
        }        
        const token = signToken(data)  // se encripta, firma el token
        console.log(token)
        res.json({
            msg: "Envio de Token",
            data: token
        })
    } catch (error) {
        next(error)
    }
}

const handleAuth = (req, res, next) => {
    try {
        res.json({
            msg: "Usuario Autenticado",
            data: req.user
        })
    } catch (error) {
        next(error)
    }
}

// CRUD de USUARIOS

const handleReadUsuarios = async (req, res, next) => {
    try {
        const response = await Auth.readUsuarios()
        res.json({
            msg: "Lista de usuarios",
            data: response
        })
    } catch (error) {
        next(error)
    }
}

const handleReadUsuario = async (req, res, next) => {
    try {
        const { id } = req.params
        const exists = await Auth.existsUser(id)
        if (!exists) {
            throw new Error('ID_NOT_FOUND', { cause: 'Error en la base de datos' })
        }
        const response = await Auth.readUsuario(id)
        res.json({
            msg: "Usuario por id",
            data: response
        })
    } catch (error) {
        next(error)
    }
}

const handleUpdateAdmin = async (req, res, next) => {
    try {
        const { id } = req.params
        const exists = await Auth.existsUser(id)
        if (!exists) {
            throw new Error('ID_NOT_FOUND', { cause: 'Error en la base de datos' })
        }
        const { nombre, apellido, telefono, comuna_id, direccion, rol_id } = req.body
        const response = await Auth.updateAdmin(id, nombre, apellido, telefono, comuna_id, direccion, rol_id)
        res.json({
            msg: "Usuario Admin actualizado",
            data: response
        })
    } catch (error) {
        next(error)
    }
}

const handleUpdateUsuario = async (req, res, next) => {
    try {
        const { id } = req.params
        const exists = await Auth.existsUser(id)
        if (!exists) {
            throw new Error('ID_NOT_FOUND', { cause: 'Error en la base de datos' })
        }

        // ⚠️ Evita que un usuario cliente actualice otro usuario
        if (req.user.rol_id === 2 && req.user.id !== parseInt(id)) {
            return res.status(403).json({ error: "No tienes permiso para modificar otro usuario" });
        }
        
        const { nombre, apellido, telefono, comuna_id, direccion } = req.body
        const response = await Auth.updateUsuario(id, nombre, apellido, telefono, comuna_id, direccion)
        res.json({
            msg: "Usuario actualizado",
            data: response
        })
    } catch (error) {
        next(error)
    }
}

const handleDeleteUsuario = async (req, res, next) => {
    try {
        const { id } = req.params
        const exists = await Auth.existsUser(id)
        if (!exists) {
            throw new Error('ID_NOT_FOUND', { cause: 'Error en la base de datos' })
        }
        const response = await Auth.deleteUsuario(id)
        res.json({
            msg: "Usuario eliminado",
            data: response
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {handleLogin, handleRegister, handleAuth, handleReadUsuarios, handleReadUsuario, handleUpdateAdmin, handleUpdateUsuario, handleDeleteUsuario}


