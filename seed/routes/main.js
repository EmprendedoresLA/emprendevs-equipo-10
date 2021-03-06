var app = module.parent.exports.app;
var Videos = require('../models/videos.js');

app.get('/video/:vid', function(req, res){
    var v = new Videos({ video: req.params.vid });
    v.save(function(err, doc){
        if(!err){
            res.redirect('/video/ver/' + doc.video + '/' + doc.id);
        } else {
            res.end(err);    
        }    
    });
});


app.get('/video/ver/:vid/:id', function(req, res){
    Videos.findOne({ _id: req.params.id }, function(err, doc){
        if(!err){
            if (doc.video == req.params.vid){
                res.redirect('/');
            }else{
                res.redirect('/video/ver/' + doc.video + '/' + doc.id);
            }
        } else {
            res.end(err);    
        }    
    });

});
