'use strict';

var Anio = require('../models/anio');
var mongoose = require('mongoose');

// Definicion de 5 metodos
function getAnio(req, res){
   //Obtenemos el Id que llega
    var anioId = req.params.id;
    // Verificamos si el parametro enviado es un ObjecId
    var idValido = mongoose.Types.ObjectId.isValid(anioId);
    if(!idValido){
        //si no es valido mostramos un mensaje de id invalido
        res.status(409).send({message:'Id Invalido'});
    }else{
        //Buscaremos un documento por el Id proporcionado
        Anio.findById(anioId,function(err,anio){
            if(err){
                console.log(err)
                res.status(509).send({message:'Error al obtener anio. ', error:err});
            }else{
                if(!anio){
                    res.status(404).send({message:'No existe el anio con el id proporcionado'});
                }else{
                    res.status(200).send({anio})
                }
            }
        });
    }
}

function getAnios(req, res){
    Anio.find({}).sort('anio').exec(function(err,anios){
        if(err){
            console.log(err)
            res.status(500).send({message:'Error al obtener los anios', error:err});
        }else{
            res.status(200).send({anios})
        }
    });
}

function saveAnio(req, res){
    var anio = new Anio(req.body);

    anio.save(function(err,anioSaved){
        if(err){
            console.log(err)
            res.status(500).send({message:'Error al guardar en el Anio', error:err});
        }else{
            res.status(200).send({saved:anioSaved})
        }
    });
};

function updateAnio(req, res){
    //obtenemos el id que llega como parametro
    var anioId = req.params.id;
    //verificamos si el parametro enviado es un ObjectId
    var idValido = mongoose.Types.ObjectId.isValid(anioId);
    if(!idValido){
        //Si no es valido mostramos un mensaje de Id invalido
        res.status(409).send({message:'Id Invalido'});
    }else{
        //utilizamos la función findByAnUpdate, busca un doc por id y lo actualiza
        Anio.findByIdAndUpdate(anioId, req.body, function(err, anioUpdate){
            if(err){
                console.log(err)
                res.status(500).send({message:'Error al actualizar el Anio', error:err});
            }else{
                //Si no existe el documento con el id proporcionado mostramos un 404
                if(!anioUpdate){
                    res.status(404).send({message:'No existe el anio con el id proporcionado'});
                }else{
                    //Si se actualiza correctamente buscamos nuevamente en base ya que el nos retorna
                    //un objeto pero este no es el actualizado sino el objeto viejo
                    Anio.findById(anioId, function(err, anioNuevo){
                        //Buscamos por el Id y retornamos el registro viejo y el nuevo
                        res.status(200).send({viejo:anioUpdate,nuevo:anioNuevo})
                    });
                }
            }
        });
    }
}

function deleteAnio(req,res){
    //Obtenemos el id que llega como parametro
    var anioId = req.params.id;
    //Verificamos si el parametro enviado es un ObjId
    var idValido = mongoose.Types.ObjectId.isValid(anioId);
    if(!idValido){
        //Si no es valido mostramos un mensaje de Id invalido
        res.status(409).send({message:'Id invalido. '});
    }else{
        //Buscamos un documento por el Id proporcionado
        Anio.findById(anioId, function(err,anio){
            if(err){
                console.log(err)
                res.status(500).send({message:'Error al obtener el anio.', error:err});
            }else{
                if(!anio){
                    res.status(404).send({message:'No existe el anio con el id Proporcionado'});
                }else{
                    //Eliminamos el anio encontrado
                    anio.remove(function(err){
                        if(err){
                            res.status(500).send({message:'Error al eliminar el anio.', error:err});
                        }else{
                            res.status(200).send({message:'El anio se ha eliminado correctamente'});
                        }
                    });
                }
            }
        });
    }
}

module.exports = {
    getAnio,
    getAnios,
    saveAnio,
    updateAnio,
    deleteAnio
}