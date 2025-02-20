
const { Pool } = require('pg')  // Pool es una clase, permite conectar a una DB.
const {DB_HOST, DB_NAME, DB_USER, DB_PASSWORD, DB_PORT } = process.env

const pool = new Pool({   //crea var para guardar instancia de la DB creada
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    // port: DB_PORT,
    allowExitOnIdle: true //en los tiempos muertos, cierra la conexión
})

pool.connect() // devuelve una promesa
    .then(() => console.log('Conectado a base de datos ' + DB_NAME )) //promesa exitosa
    .catch(err => console.error('Error al conectar a la base de datos', err)) //promesa rechazada

module.exports = pool

/*DB_HOST = 'localhost'
DB_USER = 'postgres'
DB_PASSWORD = '2232'
DB_NAME = 'pasteleria'
DB_PORT = '5434'
PORT = '3000'

JWT_SECRET = 'pasteleria'*/