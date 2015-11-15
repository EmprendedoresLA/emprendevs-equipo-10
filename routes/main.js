var app = module.parent.exports.app;
var Videos = require('../models/videos.js');
var Conect = require('../models/conect.js');

app.get('/video/:vid', function(req, res){
    //guardado de numero de video e id propia de mongodb
    var v = new Videos({ video: req.params.vid , estado: "buscando" });
    v.save(function(err, doc){
        if(!err){
            //redireccionamiento a una ruta con dichos parametros
            res.redirect('/video/ver/' + doc.video + '/' + doc.id);
        } else {
            res.end(err);    
        }    
    });
});


app.get('/video/ver/:vid/:id', function(req, res){
    //verificacion de id y numero de video en rutas
    Videos.findOne({ _id: req.params.id }, function(err, doc){
        if(!err){
            if (doc.video == req.params.vid){
                Videos.find({},function(err, docum){
                    
                    docum.forEach(function(item){
                        //console.log(JSON.stringify(doc) + 'doc\n\n');
                        //console.log(JSON.stringify(docum) + 'docum\n');
                        if (doc.video == item.video && doc.id != item.id){
                            console.log("encontro video");
                            if (item.estado == "listo"){
                                console.log("encontro listo, segunda rama");
                                //segunda rama
                            }else{
                                console.log(" El servidor alimenta el feed");
                                //el servidor alimenta el feed
                                ///////////////////////////////////////////////
                                item.save(function(err, item){
                                    if(!err){
                                     //redirecciono   res.redirect('/');
                                     var cServ = new Conect({idFeed:"000000", idClient:item.id, estado:true});
                                     cServ.save(function(err, peers){
                                        if(!err){
                                            var cClient = new Conect({idFeed: peers.id, estado:false});
                                             cClient.save(function(err, item){
                                                if(!err){
                                                    item.estado = "listo";
                                                    item.save(function(error, item){
                                                        if(!err){
                                                            while(){
                                                                //terminar
                                                            }
                                                        }
                                                        else{res.end(err);}
                                                    });
                                                }
                                                else{res.end(err);}
                                                });
                                        }
                                        else{res.end(err);}
                                        });
                                    } else {
                                        res.end(err);    
                                    }    

                                });
                            }

                        }else{
                            console.log("NO encontro video");
                        }
                    
                    });
                });
                //res.redirect('/');
            }else{
                //cambiar estado a buscando
                doc.estado = "buscando";
                doc.save(function(err, doc){
                    if(!err){
                        console.log(JSON.stringify(doc));
                        res.redirect('/video/ver/' + doc.video + '/' + doc.id);
                    } else {
                        res.end(err);    
                    }    

                });

            }
        } else {
            res.end(err);    
        }    
    });

});
