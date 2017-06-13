'use strict';

var express = require('express');

var anioController = require('../controllers/anio');

var api = express.Router();

api.get('/anio/:id?', anioController.getAnio);
api.get('/anios/', anioController.getAnios);
api.post('/anio', anioController.saveAnio);
api.put('/anio/:id?', anioController.updateAnio);
api.delete('/anio/:id?', anioController.deleteAnio);

module.exports = api;