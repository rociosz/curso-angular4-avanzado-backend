'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// Cargando RUTAS//


//Middlewares de BODY-PARSER//
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Configurar CABECERAS Y CORS//


//Rutas Base//
app.get('/probando', (req, res) => {
    res.status(200).send({message: 'Este es el mètodo probando'});
});

module.exports = app;