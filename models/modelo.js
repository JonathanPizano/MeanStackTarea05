'use stric';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ModeloSchema = new Schema(
    {
        nombre: {
            type: String,
            trim: true,
            default: '',
            required: 'Inserta un nombre del modelo por favor',
            index: {
                unique: false,
                dropDups: true
            }
        },
        id_marca: {
            type:Schema.ObjectId,
            required:'Inserta una marca del modelo por favor' 
        }
    },
    {
        timestamps: true
    }
);

var Modelo = mongoose.model('Modelo', ModeloSchema );
module.exports = Modelo;