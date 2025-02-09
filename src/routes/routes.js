const express = require('express') 
const app = express()

app.use('/auth', require('./auth.routes'))
app.use('/productos', require('./productos.routes'))

module.exports = app;
