'use strict';

var Marca = require('../models/marca');
var mongoose = require('mongoose');

// Definicion de 5 metodos
function getMarca(req, res){
   //Obtenemos el Id que llega
    var marcaId = req.params.id;
    // Verificamos si el parametro enviado es un ObjecId
    var idValido = mongoose.Types.ObjectId.isValid(marcaId);
    if(!idValido){
        //si no es valido mostramos un mensaje de id invalido
        res.status(409).send({message:'Id Invalido'});
    }else{
        //Buscaremos un documento por el Id proporcionado
        Marca.findById(marcaId,function(err,marca){
            if(err){
                console.log(err)
                res.status(509).send({message:'Error al obtener marca. ', error:err});
            }else{
                if(!marca){
                    res.status(404).send({message:'No existe el marca con el id proporcionado'});
                }else{
                    res.status(200).send({marca})
                }
            }
        });
    }
}

function getMarcas(req, res){
    Marca.find({}).sort('nombre').exec(function(err,marcas){
        if(err){
            console.log(err)
            res.status(500).send({message:'Error al obtener los marcas', error:err});
        }else{
            res.status(200).send({marcas})
        }
    });
}

function saveMarca(req, res){
    var marca = new Marca(req.body);

    marca.save(function(err,marcaSaved){
        if(err){
            console.log(err)
            res.status(500).send({message:'Error al guardar en el Marca', error:err});
        }else{
            res.status(200).send({saved:marcaSaved})
        }
    });
};

function updateMarca(req, res){
    //obtenemos el id que llega como parametro
    var marcaId = req.params.id;
    //verificamos si el parametro enviado es un ObjectId
    var idValido = mongoose.Types.ObjectId.isValid(marcaId);
    if(!idValido){
        //Si no es valido mostramos un mensaje de Id invalido
        res.status(409).send({message:'Id Invalido'});
    }else{
        //utilizamos la función findByAnUpdate, busca un doc por id y lo actualiza
        Marca.findByIdAndUpdate(marcaId, req.body, function(err, marcaUpdate){
            if(err){
                console.log(err)
                res.status(500).send({message:'Error al actualizar el Marca', error:err});
            }else{
                //Si no existe el documento con el id proporcionado mostramos un 404
                if(!marcaUpdate){
                    res.status(404).send({message:'No existe el marca con el id proporcionado'});
                }else{
                    //Si se actualiza correctamente buscamos nuevamente en base ya que el nos retorna
                    //un objeto pero este no es el actualizado sino el objeto viejo
                    Marca.findById(marcaId, function(err, marcaNuevo){
                        //Buscamos por el Id y retornamos el registro viejo y el nuevo
                        res.status(200).send({viejo:marcaUpdate,nuevo:marcaNuevo})
                    });
                }
            }
        });
    }
}

function deleteMarca(req,res){
    //Obtenemos el id que llega como parametro
    var marcaId = req.params.id;
    //Verificamos si el parametro enviado es un ObjId
    var idValido = mongoose.Types.ObjectId.isValid(marcaId);
    if(!idValido){
        //Si no es valido mostramos un mensaje de Id invalido
        res.status(409).send({message:'Id invalido. '});
    }else{
        //Buscamos un documento por el Id proporcionado
        Marca.findById(marcaId, function(err,marca){
            if(err){
                console.log(err)
                res.status(500).send({message:'Error al obtener el marca.', error:err});
            }else{
                if(!marca){
                    res.status(404).send({message:'No existe el marca con el id Proporcionado'});
                }else{
                    //Eliminamos el marca encontrado
                    marca.remove(function(err){
                        if(err){
                            res.status(500).send({message:'Error al eliminar el marca.', error:err});
                        }else{
                            res.status(200).send({message:'El marca se ha eliminado correctamente'});
                        }
                    });
                }
            }
        });
    }
}

module.exports = {
    getMarca,
    getMarcas,
    saveMarca,
    updateMarca,
    deleteMarca
}