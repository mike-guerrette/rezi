'use strict';

var orm = require('orm');

var db;

module.exports.init = function(config) {
    if (db) {
        return db;
    }
    db = {};

    var pgOptions = {
        database: config.PG_DB,
        protocol: 'postgres',
        host: config.PG_HOST,
        port: config.PG_PORT,
        user: config.PG_USER,
        password: config.PG_PASS,
        query: {
            pool: true
        }
    };

    db.orm = orm.connect(process.env.DATABASE_URL || pgOptions, function(err) {
        if (err) {
            console.error('Failed to connect to Postgres DB');
            console.error(err, err.stack);
            throw err;
        }
    });

    //Registering models; NOTE: order is important!
    db.User = require('./models/user')(db.orm).User;
    db.Location = require('./models/location')(db.orm).Location;

    return db;
};