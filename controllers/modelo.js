'use strict';

var Modelo = require('../models/modelo');
var mongoose = require('mongoose');

// Definicion de 5 metodos
function getModelo(req, res){
   //Obtenemos el Id que llega
    var modeloId = req.params.id;
    // Verificamos si el parametro enviado es un ObjecId
    var idValido = mongoose.Types.ObjectId.isValid(modeloId);
    if(!idValido){
        //si no es valido mostramos un mensaje de id invalido
        res.status(409).send({message:'Id Invalido'});
    }else{
        //Buscaremos un documento por el Id proporcionado
        Modelo.findById(modeloId,function(err,modelo){
            if(err){
                console.log(err)
                res.status(509).send({message:'Error al obtener modelo. ', error:err});
            }else{
                if(!modelo){
                    res.status(404).send({message:'No existe el modelo con el id proporcionado'});
                }else{
                    res.status(200).send({modelo})
                }
            }
        });
    }
}

function getModelos(req, res){
    Modelo.find({}).sort('nombre').exec(function(err,modelos){
        if(err){
            console.log(err)
            res.status(500).send({message:'Error al obtener los modelos', error:err});
        }else{
            res.status(200).send({modelos})
        }
    });
}

function saveModelo(req, res){
    var modelo = new Modelo(req.body);

    modelo.save(function(err,modeloSaved){
        if(err){
            console.log(err)
            res.status(500).send({message:'Error al guardar en el Modelo', error:err});
        }else{
            res.status(200).send({saved:modeloSaved})
        }
    });
};

function updateModelo(req, res){
    //obtenemos el id que llega como parametro
    var modeloId = req.params.id;
    //verificamos si el parametro enviado es un ObjectId
    var idValido = mongoose.Types.ObjectId.isValid(modeloId);
    if(!idValido){
        //Si no es valido mostramos un mensaje de Id invalido
        res.status(409).send({message:'Id Invalido'});
    }else{
        //utilizamos la función findByAnUpdate, busca un doc por id y lo actualiza
        Modelo.findByIdAndUpdate(modeloId, req.body, function(err, modeloUpdate){
            if(err){
                console.log(err)
                res.status(500).send({message:'Error al actualizar el Modelo', error:err});
            }else{
                //Si no existe el documento con el id proporcionado mostramos un 404
                if(!modeloUpdate){
                    res.status(404).send({message:'No existe el modelo con el id proporcionado'});
                }else{
                    //Si se actualiza correctamente buscamos nuevamente en base ya que el nos retorna
                    //un objeto pero este no es el actualizado sino el objeto viejo
                    Modelo.findById(modeloId, function(err, modeloNuevo){
                        //Buscamos por el Id y retornamos el registro viejo y el nuevo
                        res.status(200).send({viejo:modeloUpdate,nuevo:modeloNuevo})
                    });
                }
            }
        });
    }
}

function deleteModelo(req,res){
    //Obtenemos el id que llega como parametro
    var modeloId = req.params.id;
    //Verificamos si el parametro enviado es un ObjId
    var idValido = mongoose.Types.ObjectId.isValid(modeloId);
    if(!idValido){
        //Si no es valido mostramos un mensaje de Id invalido
        res.status(409).send({message:'Id invalido. '});
    }else{
        //Buscamos un documento por el Id proporcionado
        Modelo.findById(modeloId, function(err,modelo){
            if(err){
                console.log(err)
                res.status(500).send({message:'Error al obtener el modelo.', error:err});
            }else{
                if(!modelo){
                    res.status(404).send({message:'No existe el modelo con el id Proporcionado'});
                }else{
                    //Eliminamos el modelo encontrado
                    modelo.remove(function(err){
                        if(err){
                            res.status(500).send({message:'Error al eliminar el modelo.', error:err});
                        }else{
                            res.status(200).send({message:'El modelo se ha eliminado correctamente'});
                        }
                    });
                }
            }
        });
    }
}

module.exports = {
    getModelo,
    getModelos,
    saveModelo,
    updateModelo,
    deleteModelo
}