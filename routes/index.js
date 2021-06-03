const express = require('express');
const router = express.Router();

//Controller import
const proyectosController = require('../controllers/proyectosController');

module.exports = () => {
    //Route for home
    router.get('/', proyectosController.proyectosHome);
    router.get('/nuevo-proyecto', proyectosController.formularioProyecto);
    router.post('/nuevo-proyecto', proyectosController.nuevoProyecto);
    return router;
} 