const { INTEGER } = require('sequelize');
const Sequelize = require('sequelize');

const db = require('../config/db');

const Proyectos = db.define('poryectos', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: Sequelize.STRING,
    url: Sequelize.STRING,
});

module.exports = Proyectos;