const Proyectos = require('../models/Proyectos');
const Tareas = require('../models/Tareas');
const slug = require('slug');
const { reset } = require('slug');

exports.proyectosHome = async (req, res) => {
    const usuarioId = res.locals.usuario.id;
    const proyectos = await Proyectos.findAll({where: { usuarioId }});
    
    res.render('index', {
        nombrePagina : 'Proyectos',
        proyectos,
    });
}

exports.formularioProyecto = async (req, res) => {
    const usuarioId = res.locals.usuario.id;
    const proyectos = await Proyectos.findAll({where: { usuarioId }});

    res.render('nuevoProyecto', {
        nombrePagina : 'Nuevo Proyecto',
        proyectos
    });
}

exports.nuevoProyecto = async (req, res) => {
    const usuarioId = res.locals.usuario.id;
    const proyectos = await Proyectos.findAll({where: { usuarioId }});

    const { nombre } = req.body;
    console.log('nuevo');
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
        const usuarioId = res.locals.usuario.id;
        const proyecto = await Proyectos.create({ nombre, usuarioId });
        res.redirect('/');  
    }
    //res.send('Enviaste el Formulario', );
}

exports.proyectoPorURL = async (req, res) => {
    const usuarioId = res.locals.usuario.id;
    const proyectosPromise = Proyectos.findAll({where: { usuarioId }});
    const proyectoPromise = Proyectos.findOne({
        where: {
            url: req.params.url,
            usuarioId
        }

    })
    const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise])

    //
    const tareas = await Tareas.findAll({
        where: {
            proyectoId : proyecto.id
        }
    })

    if(!proyecto) return next();

    res.render('tareas', {
        nombrePagina: 'Tareas del Proyecto',
        proyectos,
        proyecto,
        tareas,
    });
}

exports.formularioEditar = async (req, res) => {
    const usuarioId = res.locals.usuario.id;
    const proyectosPromise = Proyectos.findAll({where: { usuarioId }});

    const proyectoPromise = Proyectos.findOne({
        where: {
            id: req.params.id,
            usuarioId
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
    const usuarioId = res.locals.usuario.id;
    const proyectos = await Proyectos.findAll({where: { usuarioId }});

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

exports.eliminarProyecto = async (req, res, next) => {
    //console.log(req.params)
    const urlProyecto = req.params.url;
    //console.log('ppp - ' + urlProyecto);
    const resultado = await Proyectos.destroy({where: { url : urlProyecto}});
    
    if(!resultado) {
        return next();
    }

    res.status(200).send('Proyecto eliminado correctamente')
}