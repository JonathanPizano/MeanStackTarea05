'use strict';

var express = require('express');

var modeloController = require('../controllers/modelo');

var api = express.Router();

api.get('/modelo/:id?', modeloController.getModelo);
api.get('/modelos/', modeloController.getModelos);
api.post('/modelo', modeloController.saveModelo);
api.put('/modelo/:id?', modeloController.updateModelo);
api.delete('/modelo/:id?', modeloController.deleteModelo);

module.exports = api;