var Video = require('../models/videos'),
	Conect = require('../models/videos');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/p2p');

describe('Proyecto de videos', function(){

	it('Usar base de datos', function (done) {
		var v = new Video({ video: 4, estado: "buscando"});
			v.save(done);
	});

	it('Usar base de datos', function (done) {
		var c = new Conect({ idFeel: "123", idClient: "321", estado: true});
			c.save(done);
	});

});