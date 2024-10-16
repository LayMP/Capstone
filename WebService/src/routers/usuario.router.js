const router = require('express').Router();

const usuario = require('../controllers/usuario.controler');


router.get('/GetUserByCorreo/:id',usuario.viewByCorreo);//Ver correo existente
router.get('/GetUserByRut/:id',usuario.viewByRut);//Ver rut existe
router.get('/GetUserByCorreoAndRut',usuario.viewByCorreoAndRut);//Ver rut existe
router.get('/LoginUser',usuario.login);//Realizar login
router.post('/CreateUser',usuario.createUser);//Crear usuario
router.put('/UpdatePassword',usuario.update);//Editar usuario
router.delete('/usuario/:id',usuario.delete);//Eliminar usuario





module.exports = router 