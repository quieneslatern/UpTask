const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const Usuarios = require('../models/Usuarios');

//Local Strategy
passport.use(
    new localStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email, password, done) => {
            // try {    
                //console.log('validacion');     
                const usuario = await Usuarios.findOne({
                    where: {
                        email: email
                        }
                }) 
                    .then((usuario) => {
                        //console.log(usuario);
                        if(!usuario.verificarPassword(password)){
                            return done(null, null, {
                                message : 'Usuario o password Incorrectos.'
                            })
                        }
                        return done(null, usuario);
                    })
                    .catch(() => {
                        return done(null, null, {
                            message : 'Esa cuenta no existe'
                        })
                    })
            /*    if(!usuario.verificarPassword(password)){
                    return done(null, null, {
                        message : 'Usuario o password Incorrectos.'
                    })
                }


            } catch(error) {
                //console.log(error)
                return done(null, null, {
                    message : 'Esa cuenta no existe'
                })
            }*/
        }
    )
);

passport.serializeUser((usuario, callback) => {
    callback(null, usuario)
})

passport.deserializeUser((usuario, callback) => {
    callback(null, usuario)
})

module.exports = passport;