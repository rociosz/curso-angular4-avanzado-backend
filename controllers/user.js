'use strict'

// Modulos
var bcrypt = require('bcrypt-nodejs');

// Modelos
var User = require('../models/user');

// Servicios jwt
var jwt = require('../services/jwt');

// Acciones
function pruebas(req, res){
    res.status(200).send({
        message: 'Probando el controlador de usuarios y la acción pruebas',
        user: req.user
    });
}

function saveUser(req, res){
   
    // Crear objeto usuario
    var user = new User();

    // Recoger parametros peticion
    var params = req.body;

    if(params.password && params.name && params.surname && params.email){
            
        // Asignar valores al objeto de usuario
        user.name = params.name;
        user.surname = params.surname;
        user.email = params.email;
        user.role = 'ROLE_USER';
        user.image = null;

        User.findOne({email: user.email.toLowerCase()}, (err, issetUser) => {
            if(err){
                res.status(500).send({message: 'Error al comprobar el usuario'});
            }else{
                if(!issetUser){

                    // Cifrar contraseña
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
                        message: 'El usuario no puede registrarse'
                    });
                }
            }
        });
            

    }else{
        res.status(200).send({
            message: 'Introduce los datos correctamnte para poder registrar al usuario'
        });
    }
}

function login(req, res){
    var params = req.body;

    var email = params.email;
    var password = params.password;

    User.findOne({email: email.toLowerCase()}, (err, user) => {
            if(err){
                res.status(500).send({message: 'Error al comprobar el usuario'});
            }else{
                if(user){
                    bcrypt.compare(password, user.password, (err, check) => {
                        if(check){

                            // Comprobando y generando el token
                            if(params.gettoken){
                            // Devolver el token
                                res.status(200).send({
                                //Devuelve los datos del usuario 
                                    //user: user,
                                    token: jwt.createToken(user)
                                });
                            }else{
                                res.status(200).send(user);
                            }
                            
                        }else{
                            res.status(404).send({
                                message: 'El usuario no ha podido loguearse correctamente'
                            });     
                        }
                    });
                    
                }else{
                    res.status(404).send({
                        message: 'El usuario no ha podido loguearse'
                    });
                }
            }
    });
}

function updateUser(req, res){
    var userId = req.params.id;
    var update = req.body;
    delete update.password;

    if(userId != req.user.sub){
        return res.status(500).send({message: 'No tienes permiso para actualizar el usuario'});
    }

    User.findByIdAndUpdate(userId, update, {new:true}, (err, userUpdate) => {
        if(err){
            res.status(500).send({
                message: 'Error al actualizar usuario'
            });
        }else{
            if(!userUpdate){
                res.status(404).send({message: 'No se ha podido actualizar el usuario'});
            }else{
                res.status(200).send({user:userUpdate});
            }
        }
    });

}

module.exports = {
    pruebas,
    saveUser,
    login,
    updateUser
};