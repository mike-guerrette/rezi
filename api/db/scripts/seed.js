'use strict';

var async = require('async'),
    config = require('../../config'),
    db = require('../').init(config);

async.series([
    function(next) {
        db.orm.drop(function() {
            db.orm.sync(next);
        });
    },
    function(next) {
        db.User.register('mike', 'word', function(err) {
            next(err);
        })
    }
], function(err) {
    if (err) {
        console.error(err);
        process.exit(1);
    } else {process.exit();}
});