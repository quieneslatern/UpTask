const express = require('express');
const router = express.Router();

const { body } = require('express-validator/check');

//Controller import
const proyectosController = require('../controllers/proyectosController');

module.exports = () => {
    //Route for home
    router.get('/', proyectosController.proyectosHome);
    router.get('/nuevo-proyecto', proyectosController.formularioProyecto);
    router.post('/nuevo-proyecto', 
        body('nombre').not().isEmpty().trim().escape(),
        proyectosController.nuevoProyecto
        );
    router.get('/proyectos/:url', proyectosController.proyectoPorURL);
    
    return router;
} 