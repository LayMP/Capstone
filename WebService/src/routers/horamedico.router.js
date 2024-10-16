const router = require('express').Router();

const horamedico = require('../controllers/horamedico.controler');



router.get('/ObtenerHoraMedico/:id',horamedico.getListadoHoraDisponible);
router.post('/AgregarHoraMedico',horamedico.postCreateHoraMedico);//Crear usuario
router.delete('/EliminarHoraMedico/:id',horamedico.deleteCreateHoraMedico);
router.put('/ActualizarHoraMedico/:id',horamedico.updateHoraMedico);




module.exports = router 