'use strict'

// Modulos
var fs = require('fs');
var path= require('path');

// Modelos
var User = require('../models/user');
var Alumno = require('../models/alumno');

// Acciones
function pruebas(req, res){
    res.status(200).send({
        message: 'Probando el controlador de Alumnos y la acción pruebas',
        user: req.user
    });
}

    
module.exports = {
    pruebas
};