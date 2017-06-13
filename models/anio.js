'use stric';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AnioSchema = new Schema(
    {
        anio: {
            type: String,
            trim: true,
            default: '',
            required: 'Inserta una Anio por favor',
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

var Anio = mongoose.model('Anio', AnioSchema );
module.exports = Anio;