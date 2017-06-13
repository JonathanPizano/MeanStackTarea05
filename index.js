'use strict';

var app = require('./app');
var database = require('./database')

var port = process.env.PORT || 7070

app.listen(7070, function(){
    console.log('Aplicacion corriendo en el puert: ' + port)
});