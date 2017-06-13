var express = require('express')
var bodyParser = require('body-parser')

var app = express()

apiMarca = require('./routes/marca')
apiModelo = require('./routes/modelo')
apiVersion = require('./routes/version')
apiAnio = require('./routes/anio')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use(function(req , res, next){
    //Puede ser consumida desde cualquier lugar
    res.header('Access-Control-Allow-Origin','*');
    //Cabeceras permitidas
    res.header('Access-Control-Allow-Header','X-API-KEY,Origin,X-Requested-With,Content-Type,Accept,Access-Control-Request-Method');
    //Metodos Permitidos
    res.header('Access-Control-Allow-Methods','GET,POST,PUT,DELETE');
    res.header('Allow','GET,POST,PUT,DELETE');
    next();
});

app.use('/api', apiMarca);
app.use('/api', apiModelo);
app.use('/api', apiVersion);
app.use('/api', apiAnio);

module.exports = app;