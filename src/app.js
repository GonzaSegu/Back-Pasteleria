const express = require('express') // importar paquete express
const morgan = require ('morgan') //importa middleware
const APIRoutes = require('./routes/routes')   // trae todas las rutas de ./src/routes/routes.js
const errorMiddleware = require('./middlewares/errorMiddleware')
const cors = require('cors') 

const app = express() // instanciar - enrutador
//middlewares (todos los middlewares deben ser metodos)
app.use(morgan('dev')) //pasame los formatos que te pase los logs en consola
app.use(express.json())  //parsear solicitudes json a objeto javascript accesible a través de req.body

// sistema de rutas 
app.use('/api', APIRoutes)    // rutas traídas irán despues de ‘/api/’

// Middleware de manejo de errores (siempre al final)
app.use(errorMiddleware)    

module.exports = app