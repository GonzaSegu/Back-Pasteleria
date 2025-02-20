const express = require('express') // importar paquete express
const morgan = require ('morgan') //importa middleware
const APIRoutes = require('./routes/routes')   // trae todas las rutas de ./src/routes/routes.js
const errorMiddleware = require('./middlewares/errorMiddleware')
const cors = require('cors') 

const app = express() // instanciar - enrutador
//middlewares (todos los middlewares deben ser metodos)
app.use(morgan('dev')) //pasame los formatos que te pase los logs en consola
app.use(express.json())  //parsear solicitudes json a objeto javascript accesible a través de req.body

app.use(cors());
// sistema de rutas

const allowedOrigins = [
    "http://localhost:5173", // Desarrollo local
    "https://front-pasteleria.app" // Reemplaza con el dominio de tu frontend en Netlify
];

app.use(cors({
    origin: allowedOrigins,// Reemplaza con el dominio de tu frontend en Netlify
    methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
    allowedHeaders: ["Content-Type", "Authorization"] // Cabeceras permitidas
}));

app.get("/", (req, res) => {
    res.json({ message: "CORS habilitado!" });
});

app.use('/api', APIRoutes)    // rutas traídas irán despues de ‘/api/’

// Middleware de manejo de errores (siempre al final)
app.use(errorMiddleware)

module.exports = app

/*
en Archivo package.json:
"scripts": {
    "test": "jest --forceExit",

"dependencies": {
    "supertest": "^7.0.0"

en index.js:
const server = app.listen(PORT || 3001, () => {        //asignando puerto en el servidor
    console.log(`Server running on http://localhost:${PORT}`)
})  

module.exports = server


crear carpeta test con archivo server.spec.js




    */