const Usuarios = require("../models/Usuarios")

exports.formCrearCuenta = (req, res) => {
    res.render('crearCuenta', {
        nombrePagina : 'Crear Cuenta en UpTask'
    })
}

exports.formIniciarSesion = (req, res) => {
    console.log(res.locals.mensajes);
    
    res.render('iniciarSesion', {
        nombrePagina : 'Iniciar Sesion en UpTask'
    })
}

exports.crearCuenta = (req, res) => {
    //read data
    //console.log(req.body)
    const {email, password} = req.body;
    try {
        //create user
        Usuarios.create({
            email,
            password
        }).then(() => {
            res.redirect('iniciar-sesion')
        }).catch((error) => {
            //console.log(error)
            req.flash('error', error.errors.map(error => error.message));
            res.render('crearCuenta', { 
                mensajes: req.flash(),
                nombrePagina: 'Crear Cuenta en Uptask',
                email
            })
        });
    } catch(error) {
        req.flash('error', error.errors.map(error => error.message));
        res.render('crearCuenta', { 
            mensajes: req.flash(),
            nombrePagina: 'Crear Cuenta en Uptask',
            email
        })
    }
}

exports.formRestablecerPassword = (req, res) => {
    res.render('reestablecer', {
        nombrePagina: "Reestablecer tu Contraseña"
    })
}