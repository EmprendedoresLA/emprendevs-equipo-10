var Video = require('../models/videos');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/p2p');

describe('Proyecto de conexion', function(){

	it('Usar base de datos', function (done) {
		var v = new Video({ video: 4});
			v.save(done);
	});
});