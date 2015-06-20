'use strict';

module.exports = function(config) {
	var express = require('express'),
		routes = require('./routes'),
		cors = require('cors');

	// App
	var app = express(),
		db = require('./db').init(config);

    app.use(cors({
        origin: 'http://localhost:9000'
    }));

	app.set('port', (process.env.PORT || 4000));

	routes(config, app, db);

	app.listen(app.get('port'), function() {
		console.log('API Running on port' + app.get('port'));
	});

	return app;
};
