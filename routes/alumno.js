'use strict'

var express = require('express');
var AlumnoContoller = require('../controllers/alumno');

var api = express.Router();
var md_auth = require('../middlewares/autenticate');
var md_admin = require('../middlewares/is_admin');

var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/alumnos'});

//Son rutas
api.get('/pruebas-alumnos', md_auth.ensureAuth, AlumnoContoller.pruebas);
api.post('/alumno', [md_auth.ensureAuth, md_admin.isAdmin], AlumnoContoller.saveAlumno);
api.get('/alumnos', AlumnoContoller.getAlumnos);
api.get('/alumno/:id', AlumnoContoller.getAlumno);
api.put('/alumno/:id', [md_auth.ensureAuth, md_admin.isAdmin], AlumnoContoller.updateAlumno);
api.post('/upload-image-alumno/:id', [md_auth.ensureAuth, md_admin.isAdmin, md_upload], AlumnoContoller.uploadImage);
api.get('/get-image-alumno/:imageFile', AlumnoContoller.getImageFile);
api.delete('/alumno/:id', [md_auth.ensureAuth, md_admin.isAdmin], AlumnoContoller.deleteAlumno);

module.exports = api;