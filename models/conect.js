var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var conectSchema = new Schema({
    idFeel: String,
    idClient: String,
    estado: Boolean
});

var conectModel = mongoose.model('Conect', conectSchema);

module.exports = conectModel;