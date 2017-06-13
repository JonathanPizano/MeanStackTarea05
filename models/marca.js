'use stric';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MarcaSchema = new Schema(
    {
        nombre: {
            type: String,
            trim: true,
            default: '',
            required: 'Inserta una marca por favor',
            index: {
                unique: false,
                dropDups: true
            }
        },
        pais: {
            type: String,
            trim: true,
            default: '',
            required: 'Inserta un pais de la marca por favor',
            index: {
                unique: false,
                dropDups: true
            }
        },
        fechaCreacion: {
            type: String,
            trim: true,
            default: '',
            required: 'Inserta una fecha de creacion de la marca por favor',
            index: {
                unique: false,
                dropDups: true
            }
        }
    },
    {
        timestamps: true
    }
);

var Marca = mongoose.model('Marca', MarcaSchema );
module.exports = Marca;