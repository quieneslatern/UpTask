const Proyectos = require('../models/Proyectos');
const slug = require('slug');

exports.proyectosHome = async (req, res) => {
    const proyectos = await Proyectos.findAll();
    
    res.render('index', {
        nombrePagina : 'Proyectos',
        proyectos,
    });
}

exports.formularioProyecto = async (req, res) => {
    res.render('nuevoProyecto', {
        nombrePagina : 'Nuevo Proyecto',
        proyectos
    });
}

exports.nuevoProyecto = async (req, res) => {
    const proyectos = await Proyectos.findAll();
    const { nombre } = req.body;

    let errores = [];

    if(!nombre) {
        errores.push({'texto' : 'Agrega un nombre al proyecto'});
    }

    if(errores.length > 0) {
        res.render('nuevoProyecto', {
            nombrePagina : 'Nuevo Proyecto', 
            proyectos,
            errores
        });
    } else {

        const url = slug(nombre).toLowerCase();
        const proyecto = await Proyectos.create({ nombre, url });
        res.redirect('/');  
    }
    res.send('Enviaste el Formulario', );
}

exports.proyectoPorURL = async (req, res) => {
    const proyectos = await Proyectos.findAll();
    const proyecto = await Proyectos.findOne({
        where: {
            url: req.params.url
        }

    })

    if(!proyecto) return next();

    res.render('tareas', {
        nombrePagina: 'Tareas del Proyecto',
        proyectos,
        proyecto
    });
}