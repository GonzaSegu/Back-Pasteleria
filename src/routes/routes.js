const express = require('express') 
const app = express()

app.use('/auth', require('./auth.routes'))
app.use('/productos', require('./productos.routes'))
app.use('/formas', require('./formas.routes') )
app.use('/categorias', require('./categorias.routes'))
app.use('/porciones', require('./porciones.routes'))
app.use('/roles', require('./roles.routes'))
app.use('/estados', require('./estados.routes'))
app.use('/comunas', require('./comunas.routes'))
app.use('/ordenes', require('./ordenes.routes'))

module.exports = app;
