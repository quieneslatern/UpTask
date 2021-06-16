const express = require('express');
const router = express.Router();

const { body } = require('express-validator');

//Controller import
const proyectosController = require('../controllers/proyectosController');
const tareasController = require('../controllers/tareasController');
const usuariosController = require('../controllers/usuariosController');
const authController = require('../controllers/authController');

module.exports = () => {
    //Route for home
    router.get('/', 
        authController.usuarioAutenticado,    
        proyectosController.proyectosHome
    );

    //New Proyect
    router.get('/nuevo-proyecto', 
        authController.usuarioAutenticado,
        proyectosController.formularioProyecto
    );
    router.post('/nuevo-proyecto', 
        authController.usuarioAutenticado,
        body('nombre').not().isEmpty().trim().escape(),
        proyectosController.nuevoProyecto
    );

    //Edit Proyect
    router.get('/proyectos/editar/:id', 
        authController.usuarioAutenticado,
        proyectosController.formularioEditar
    );
    router.post('/nuevo-proyecto/:id', 
        authController.usuarioAutenticado,
        body('nombre').not().isEmpty().trim().escape(),
        proyectosController.actualizarProyecto
        );
    
    //List Proyect
    router.get('/proyectos/:url', 
        authController.usuarioAutenticado,
        proyectosController.proyectoPorURL
    );
    
    //Delete Proyect
    router.delete('/proyectos/:url', 
        authController.usuarioAutenticado,
        proyectosController.eliminarProyecto
    );
    
    //New Task
    router.post('/proyectos/:url', 
        authController.usuarioAutenticado,
        tareasController.agregarTarea
    );

    //Update Task
    router.patch('/tareas/:id', 
        authController.usuarioAutenticado,
        tareasController.cambiarEstadoTarea
    );
    
    //Delete Task
    router.delete('/tareas/:id', 
        authController.usuarioAutenticado,
        tareasController.eliminarTarea
    );

    //Create account
    router.get('/crear-cuenta', usuariosController.formCrearCuenta); 
    router.post('/crear-cuenta', usuariosController.crearCuenta); 

    //Log in
    router.get('/iniciar-sesion', usuariosController.formIniciarSesion);
    router.post('/iniciar-sesion', authController.autenticarUsuario);

    //Log out
    router.get('/cerrar-sesion', authController.cerrarSesion);

    router.get('/reestablecer', usuariosController.formRestablecerPassword);
    router.post('/reestablecer', authController.enviarToken);
    router.get('/reestablecer/:token', authController.validarToken);
    router.post('/reestablecer/:token', authController.actualizarPassword);

    return router;
} 