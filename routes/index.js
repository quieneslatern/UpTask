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
    router.post('/nuevo-proyecto/:id', 
        body('nombre').not().isEmpty().trim().escape(),
        proyectosController.actualizarProyecto
        );

    router.get('/proyectos/:url', proyectosController.proyectoPorURL);
    
    router.get('/proyectos/editar/:id', proyectosController.formularioEditar);

    router.delete('/proyectos/:url', proyectosController.eliminarProyecto)
    
    return router;
} 