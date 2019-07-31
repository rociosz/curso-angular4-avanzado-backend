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


/*-----------------------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------*/
function saveAlumno(req, res){
    var alumno = new Alumno();

    var params = req.body;

    if(params.name){
        alumno.name = params.name;
        alumno.description = params.description;
        alumno.year = params.year;
        alumno.image = null;
        alumno.user = req.user.sub;

        alumno.save((err, alumnoStored) => {
            if(err){
                res.status(500).send({message: 'Error en el servidor'});
            }else{
                if(!alumnoStored){
                    res.status(404).send({message: 'No se ha guardado el Alumno'});
                }else{
                    res.status(200).send({alumno: alumnoStored});
                }
            }
        
        });
    }else{
        res.status(200).send({
            message: 'El nombre del Alumno es obligatorio',
        });
    }
}


/*-----------------------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------*/
function getAlumnos(req, res){
    Alumno.find({}).populate({path: 'user'}).exec((err, alumnos) =>{
        if(err){
            res.status(500).send({
                message: 'Error en la petición'
            });
        }else{
            if(!alumnos){
                res.status(404).send({
                    message: 'No hay Alumnos'
                });
            }else{
                res.status(200).send({
                    alumnos
                });
            }
        }
    });
}


/*-----------------------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------*/
function getAlumno(req, res){
    var alumnoId = req.params.id;

    Alumno.findById(alumnoId).populate({path: 'user'}).exec((err, alumno) => {
        if(err){
            res.status(500).send({
                message: 'Error en la petición'
            });
        }else{
            if(!alumno){
                res.status(404).send({
                    message: 'El Alumno no existe'
                });
            }else{
                res.status(200).send({
                    alumno
                });
            }
        }
    });
}


/*-----------------------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------*/
function updateAlumno(req, res){
    var alumnoId = req.params.id;
    var update = req.body;

    Alumno.findByIdAndUpdate(alumnoId, update, {new: true}, (err, alumnoUpdated) => {
        if(err){
            res.status(500).send({
                message: 'Error en la peticion'
            });
        }else{
            if(!alumnoUpdated){
                res.status(404).send({
                    message: 'No se ha actualizado el Alumno'
                });
            }else{
                res.status(200).send({alumno: alumnoUpdated});
            }
        }
    });
}

module.exports = {
    pruebas,
    saveAlumno,
    getAlumnos,
    getAlumno,
    updateAlumno
};