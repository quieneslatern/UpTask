const express = require('express');
const router = express.Router();

const { body } = require('express-validator');

//Controller import
const proyectosController = require('../controllers/proyectosController');
const tareasController = require('../controllers/tareasController');

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
    
    router.post('/proyectos/:url', tareasController.agregarTarea);

    return router;
} 