require('dotenv').config()
const jwt = require("jsonwebtoken")

const { JWT_SECRET} = process.env

const signToken = (data) => {  //firma el token. Se necesita la data y la clave secreta
    return jwt.sign( //"pasame el payload (lo va encriptar) y el secreto que va dentro"
        data, 
        String(JWT_SECRET),   //tiene que ser en una variable de entorno
        {
            algorithm: 'HS256' //por defecto el algoritmo HS256
            //expiresIn: '24h'
        })
}

const verifyToken = (token) => {  
    return jwt.verify(token, String(JWT_SECRET))   //entrega true o false
}

const decodeToken = (token) => {
    return jwt.decode(token)
}

const getHeadersToken = (req) => {
    const Authorization = req.header("Authorization")
    return Authorization.split("Bearer ")[1]
}


module.exports = { signToken, verifyToken, decodeToken, getHeadersToken}