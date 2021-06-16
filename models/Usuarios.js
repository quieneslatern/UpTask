const Sequelize = require('sequelize');
const db = require('../config/db');
const Proyectos = require('./Proyectos');
const bcrypt = require('bcrypt')
const util = require('util')

const Usuarios = db.define('usuarios', {
    id: {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    email: {
        type : Sequelize.STRING(60),
        allowNull : false,
        validate: {
            isEmail: {
                msg : 'Agrega un E-mail valido'
            }, 
            notEmpty: {
                msg : 'El password no puede ir vacio'
            }
        },
        unique: {
            args : true,
            name : 'email',
            fields : ['email'],
            msg : 'Usuario ya registrado'
        }
    },
    password: {
        type : Sequelize.STRING(100),
        allowNull : false,
        validate: {
            notEmpty: {
                msg : 'El password no puede ir vacio'
            }
        }
    },
    token: Sequelize.STRING,
    expiracion: Sequelize.DATE,
}, {
    hooks: {
        beforeCreate(Usuario) {
            Usuario.password = bcrypt.hashSync(Usuario.password, bcrypt.genSaltSync(10))
        }
    }
});
Usuarios.prototype.verificarPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

Usuarios.hasMany(Proyectos);

module.exports = Usuarios;