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


/*-----------------------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------*/
function uploadImage(req, res){
    var alumnoId = req.params.id;
    var file_name = 'No subido...';

    if(req.files){
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];

        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];

        if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg'  || file_ext == 'gif'){

            Alumno.findByIdAndUpdate(alumnoId,{image: file_name}, {new:true}, (err, alumnoUpdate) => {
                if(err){
                    res.status(500).send({
                        message: 'Error al actualizar usuario'
                    });
                }else{
                    if(!alumnoUpdate){
                        res.status(404).send({message: 'No se ha podido actualizar el Alumno'});
                    }else{
                        res.status(200).send({user:alumnoUpdate, image: file_name});
                    }
                }
            });

        }else{
            fs.unlink(file_path, (err) => {
                if(err){
                    res.status(200).send({message: 'Extensión no valida y fichero no borrado'});
                }else{
                    res.status(200).send({message: 'Extensión no valida'});
                }
            });           
        }

    }else{
        res.status(200).send({message: 'No se han subido archivos'});
    } 
}


/*-----------------------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------*/
function getImageFile(req, res){
    var imageFile = req.params.imageFile;
    var path_file = './uploads/alumnos/'+imageFile;

    fs.exists(path_file, function(exists){
        if(exists){
            res.sendFile(path.resolve(path_file));
        }else{
            res.status(404).send({message: 'La imagen no existe'});
        }
    });
}


/*-----------------------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------*/
function deleteAlumno(req, res){
    var alumnoId = req.params.id;

    Alumno.findByIdAndRemove(alumnoId, (err, alumnoRemoved) => {
        if(err){
            res.status(500).send({message: 'Error en la peticion'});
        }else{
            if(!alumnoRemoved){
                res.status(404).send({message: 'No se ha borrado el Alumno'});
            }else{
                res.status(200).send({alumno: alumnoRemoved});
            }
        }
    });
}

module.exports = {
    pruebas,
    saveAlumno,
    getAlumnos,
    getAlumno,
    updateAlumno,
    uploadImage,
    getImageFile,
    deleteAlumno
};