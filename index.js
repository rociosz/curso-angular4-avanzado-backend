'use strict'

var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/colegio', { useMongoClient:true})
    .then(() => {
        console.log('La conexion a la Base de Datos Colegio se ha realizado correctamente...');

    })
    .catch(err => console.log(err));