const express = require('express');
const routes = require('./routes');
const path = require('path');
//const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('./config/passport')

require('dotenv').config({ path: '/local.env'})
const helpers = require('./helpers');

//start connection to database
const db = require('./config/db');
const { nextTick } = require('process');

//include model of table Proyectos
require('./models/Proyectos');
require('./models/Tareas');

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

app.use(express.urlencoded({extended: true}));

//add view dir
app.set('views', path.join(__dirname, './views'));

app.use(flash());

app.use(cookieParser());

app.use(session({
    secret : 'topsecret',
    resave : false,
    saveUninitialized : false
}));


app.use(passport.initialize());
app.use(passport.session());



app.use((req, res, next) => {
    res.locals.vardump = helpers.vardumps;
    res.locals.mensajes = req.flash();
    res.locals.usuario = {...req.user} || null;
    //console.log(passport);
    next();
})

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3003;

app.use('/', routes())

app.listen(port, host, console.log('El servidor esta funcioando'));

require('./handlers/email');