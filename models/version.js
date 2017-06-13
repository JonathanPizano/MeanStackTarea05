'use stric';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VersionSchema = new Schema(
    {
        nombre: {
            type: String,
            trim: true,
            default: '',
            required: 'Inserta una version por favor',
            index: {
                unique: false,
                dropDups: true
            }
        },
        id_modelo: {
            type:Schema.ObjectId,
            required:'Inserta un modelo de la version por favor' 
        },
        id_anio: {
            type:Schema.ObjectId,
            required:'Inserta un año de la version por favor' 
        }
    },
    {
        timestamps: true
    }
);

var Version = mongoose.model('Version', VersionSchema );
module.exports = Version;