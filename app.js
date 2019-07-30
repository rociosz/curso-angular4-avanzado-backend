'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// Cargando RUTAS//
var user_routes = require('./routes/user');

//Middlewares de BODY-PARSER//
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Configurar CABECERAS Y CORS//


//Rutas Base//
app.use('/api', user_routes);

module.exports = app;