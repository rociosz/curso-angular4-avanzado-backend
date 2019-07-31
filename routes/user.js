'use strict'

var express = require('express');
var UserContoller = require('../controllers/user');

var api = express.Router();
var md_auth = require('../middlewares/autenticate');

var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/users'});

api.get('/pruebas-del-controlador', md_auth.ensureAuth, UserContoller.pruebas);
api.post('/register', UserContoller.saveUser);
api.post('/login', UserContoller.login);
api.put('/update-user/:id', md_auth.ensureAuth, UserContoller.updateUser);
api.post('/upload-image-user/:id', [md_auth.ensureAuth, md_upload], UserContoller.uploadImage);
api.get('/get-image-file/:imageFile', UserContoller.getImageFile);

module.exports = api;