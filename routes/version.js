'use strict';

var express = require('express');

var versionController = require('../controllers/version');

var api = express.Router();

api.get('/version/:id?', versionController.getVersion);
api.get('/versiones/', versionController.getVersiones);
api.post('/version', versionController.saveVersion);
api.put('/version/:id?', versionController.updateVersion);
api.delete('/version/:id?', versionController.deleteVersion);

module.exports = api;