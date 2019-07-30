'use strict'

var express = require('express');
var UserContoller = require('../controllers/user');

var api = express.Router();

api.get('/pruebas-del-controlador', UserContoller.pruebas);

module.exports = api;