//Import 
const app = require('./app')
const config = require('./config')
//const sql = require('./database/connection');


//Variables globales
const port = config.port


app.listen(port, () => {
    console.log(`App corriendo en el puerto: ${port}`)
})  