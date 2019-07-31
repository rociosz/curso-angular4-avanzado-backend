'use strict'

var express = require('express');
var UserContoller = require('../controllers/user');

var api = express.Router();
var md_auth = require('../middlewares/autenticate');

api.get('/pruebas-del-controlador', md_auth.ensureAuth, UserContoller.pruebas);
api.post('/register', UserContoller.saveUser);
api.post('/login', UserContoller.login);

module.exports = api;