const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

const helpers = require('./helpers');


//start connection to database
const db = require('./config/db');
const { nextTick } = require('process');

//include model of table Proyectos
require('./models/Proyectos')

//db.authenticate()
db.sync()
    .then(() => console.log('Conectado Mysql'))
    .catch(error => console.log(error));

//create app of express
const app = express();

// where are the static files
app.use(express.static('public'))

//activate PUG
app.set('view engine', 'pug');

//add view dir
app.set('views', path.join(__dirname, './views'));

app.use((req, res, next) => {
    res.locals.vardump = helpers.vardumps;
    next();
})


app.use(bodyParser.urlencoded({extended: true}));

app.use('/', routes())

app.listen(8080);

