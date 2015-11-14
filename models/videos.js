var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var videoSchema = new Schema({
    video: Number
});

var videoModel = mongoose.model('Videos', videoSchema);

module.exports = videoModel;