//Import 
const express = require('express');
const cors = require('cors');
const app = express();

const usuarioRoutes = require('./routers/usuario.router');
const horaMedicoRouter = require('./routers/horamedico.router');


app.use(express.json());//acepta Json
app.use(express.urlencoded({extended: false}))//acepta datos de formularios
app.use(cors({ origin: '*' }));

//Routers
app.use(usuarioRoutes);
app.use(horaMedicoRouter);



//Export modulo app
module.exports = app
