require('dotenv').config();
require('./src/config/db'); // Fuerza la ejecución de db.js
const app = require ('./src/app')

const { PORT } = process.env



app.listen(PORT || 3001, () => {        //asignando puerto en el servidor
    console.log(`Server running on http://localhost:${PORT}`)
})  



// modelo - Controlador  - Ruta

