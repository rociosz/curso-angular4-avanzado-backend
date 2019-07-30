'use strict'

// Modulos
var bcrypt = require('bcrypt-nodejs');

// Modelos
var User = require('../models/user');

// Acciones
function pruebas(req, res){
    res.status(200).send({
        message: 'Probando el controlador de usuarios y la acción pruebas',
    });
}

function saveUser(req, res){

    // Crear objeto usuario
    var user = new User();

    // Recoger parametros peticion
    var params = req.body;

    if(params.password && params.name && params.email){

        // Asignar valores al objeto de usuario
        user.name = params.name;
        user.surname = params.surname;
        user.email = params.email;
        user.role = 'ROLE_USER';
        user.image = null;

        bcrypt.hash(params.password, null, null, function(err, hash){
            user.password = hash;

            // Guardar usuario en bd
            user.save((err, userStored) => {
                if(err){
                    res.status(500).send({message: 'Error al guardar el usuario'}); 
                }else{
                    if(!userStored){
                        res.status(404).send({message: 'No se ha registrado el usuario'});
                    }else{
                        res.status(200).send({user: userStored});
                    }
                }
            });
        });
        
    }else{
        res.status(200).send({
            message: 'Introduce los datos correctamnte para poder registrar al usuario'
        });
    }
}

module.exports = {
    pruebas,
    saveUser
};