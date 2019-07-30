'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3789;


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/colegio', { useMongoClient:true})
    .then(() => {
        console.log('La conexion a la Base de Datos Colegio se ha realizado correctamente...');

        app.listen(port, () => {
            console.log("El Servidor Local con Node y Express está corriendo correctamente...")
        });
    })
    .catch(err => console.log(err));