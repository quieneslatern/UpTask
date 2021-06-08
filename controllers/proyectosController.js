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
    const proyectos = await Proyectos.findAll();

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

        const proyecto = await Proyectos.create({ nombre, url });
        res.redirect('/');  
    }
    res.send('Enviaste el Formulario', );
}

exports.proyectoPorURL = async (req, res) => {
    const proyectosPromise = Proyectos.findAll();
    const proyectoPromise = Proyectos.findOne({
        where: {
            url: req.params.url
        }

    })
    const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise])


    if(!proyecto) return next();

    res.render('tareas', {
        nombrePagina: 'Tareas del Proyecto',
        proyectos,
        proyecto
    });
}

exports.formularioEditar = async (req, res) => {

    const proyectosPromise = Proyectos.findAll();

    const proyectoPromise = Proyectos.findOne({
        where: {
            id: req.params.id
        }

    })
    
    const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise])

    res.render('nuevoProyecto', {
        nombrePagina : 'Editar Proyecto',
        proyectos,
        proyecto
    })
}

exports.actualizarProyecto = async (req, res) => {
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

        await Proyectos.update(
            { nombre: nombre },
            { where : { id: req.params.id } }
        );
        res.redirect('/');  
    }
    res.send('Enviaste el Formulario', );
}