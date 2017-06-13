'use strict';

var Version = require('../models/version');
var mongoose = require('mongoose');

// Definicion de 5 metodos
function getVersion(req, res){
   //Obtenemos el Id que llega
    var versionId = req.params.id;
    // Verificamos si el parametro enviado es un ObjecId
    var idValido = mongoose.Types.ObjectId.isValid(versionId);
    if(!idValido){
        //si no es valido mostramos un mensaje de id invalido
        res.status(409).send({message:'Id Invalido'});
    }else{
        //Buscaremos un documento por el Id proporcionado
        Version.findById(versionId,function(err,version){
            if(err){
                console.log(err)
                res.status(509).send({message:'Error al obtener la version. ', error:err});
            }else{
                if(!version){
                    res.status(404).send({message:'No existe la version con el id proporcionado'});
                }else{
                    res.status(200).send({version})
                }
            }
        });
    }
}

function getVersiones(req, res){
    Version.find({}).sort('nombre').exec(function(err,versions){
        if(err){
            console.log(err)
            res.status(500).send({message:'Error al obtener las versiones', error:err});
        }else{
            res.status(200).send({versions})
        }
    });
}

function saveVersion(req, res){
    var version = new Version(req.body);

    version.save(function(err,versionSaved){
        if(err){
            console.log(err)
            res.status(500).send({message:'Error al guardar en la Version', error:err});
        }else{
            res.status(200).send({saved:versionSaved})
        }
    });
};

function updateVersion(req, res){
    //obtenemos el id que llega como parametro
    var versionId = req.params.id;
    //verificamos si el parametro enviado es un ObjectId
    var idValido = mongoose.Types.ObjectId.isValid(versionId);
    if(!idValido){
        //Si no es valido mostramos un mensaje de Id invalido
        res.status(409).send({message:'Id Invalido'});
    }else{
        //utilizamos la función findByAnUpdate, busca un doc por id y lo actualiza
        Version.findByIdAndUpdate(versionId, req.body, function(err, versionUpdate){
            if(err){
                console.log(err)
                res.status(500).send({message:'Error al actualizar la Version', error:err});
            }else{
                //Si no existe el documento con el id proporcionado mostramos un 404
                if(!versionUpdate){
                    res.status(404).send({message:'No existe la version con el id proporcionado'});
                }else{
                    //Si se actualiza correctamente buscamos nuevamente en base ya que el nos retorna
                    //un objeto pero este no es el actualizado sino el objeto viejo
                    Version.findById(versionId, function(err, versionNuevo){
                        //Buscamos por el Id y retornamos el registro viejo y el nuevo
                        res.status(200).send({viejo:versionUpdate,nuevo:versionNuevo})
                    });
                }
            }
        });
    }
}

function deleteVersion(req,res){
    //Obtenemos el id que llega como parametro
    var versionId = req.params.id;
    //Verificamos si el parametro enviado es un ObjId
    var idValido = mongoose.Types.ObjectId.isValid(versionId);
    if(!idValido){
        //Si no es valido mostramos un mensaje de Id invalido
        res.status(409).send({message:'Id invalido. '});
    }else{
        //Buscamos un documento por el Id proporcionado
        Version.findById(versionId, function(err,version){
            if(err){
                console.log(err)
                res.status(500).send({message:'Error al obtener la version.', error:err});
            }else{
                if(!version){
                    res.status(404).send({message:'No existe la version con el id Proporcionado'});
                }else{
                    //Eliminamos el version encontrado
                    version.remove(function(err){
                        if(err){
                            res.status(500).send({message:'Error al eliminar la version.', error:err});
                        }else{
                            res.status(200).send({message:'La version se ha eliminado correctamente'});
                        }
                    });
                }
            }
        });
    }
}

module.exports = {
    getVersion,
    getVersiones,
    saveVersion,
    updateVersion,
    deleteVersion
}