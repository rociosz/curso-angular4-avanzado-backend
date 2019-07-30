'use strict'

var express = require('express');
var UserContoller = require('../controllers/user');

var api = express.Router();

api.get('/pruebas-del-controlador', UserContoller.pruebas);
api.post('/register', UserContoller.saveUser);

module.exports = api;