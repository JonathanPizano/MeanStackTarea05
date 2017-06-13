'use strict';

var express = require('express');

var marcaController = require('../controllers/marca');

var api = express.Router();

api.get('/marca/:id?', marcaController.getMarca);
api.get('/marcas/', marcaController.getMarcas);
api.post('/marca', marcaController.saveMarca);
api.put('/marca/:id?', marcaController.updateMarca);
api.delete('/marca/:id?', marcaController.deleteMarca);

module.exports = api;