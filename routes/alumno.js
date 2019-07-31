'use strict'

var express = require('express');
var AlumnoContoller = require('../controllers/alumno');

var api = express.Router();
var md_auth = require('../middlewares/autenticate');

var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/alumnos'});

//Son rutas
api.get('/pruebas-alumnos', md_auth.ensureAuth, AlumnoContoller.pruebas);

module.exports = api;