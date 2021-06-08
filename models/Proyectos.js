const { INTEGER } = require('sequelize');
const Sequelize = require('sequelize');

const db = require('../config/db');

const Proyectos = db.define('proyectos', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: Sequelize.STRING,
    url: Sequelize.STRING,
}, {
    hooks: {
        beforeCreate(Proyecto) {
            const url = slug(nombre).toLowerCase();
            Proyecto.url = `{url}-${shortid.generate()}`
        }
    }
});

module.exports = Proyectos;