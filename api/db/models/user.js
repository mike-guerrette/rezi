'use strict';

var async = require('async'),
    bcrypt = require('bcrypt');


var bcryptRounds = 10;

var model;

module.exports = function(orm) {
    var Location = require('./location')(orm).Location;

    if (model) {
        return model;
    }
    model = {};

    model.User = orm.define('user', {
        id: {type: 'text', key: true}, //username as key
        hashed_password: {type: 'text', required: true}
    }, {
        cache: false,
        methods: {
            setPassword: function(password, callback) {
                var user = this;
                async.series([
                    function(next) {
                        bcrypt.genSalt(bcryptRounds, function(err, salt) {
                            user.salt = salt;
                            next(err);
                        });
                    },
                    function(next) {
                        bcrypt.hash(password, user.salt, function(err, hash) {
                            user.hashed_password = hash;
                            delete user.password;
                            next(err);
                        })
                    }
                ], function(err) {
                    callback(err, user, password);
                })
            },
            addNewLocation: function(attrs, callback) {
                var user = this;
                async.series([
                    function(next) {
                        Location.create(attrs, function(err, location) {
                            if (err) {next(err);}
                            else {
                                user.addLocations([location], next);
                            }
                        });
                    }
                ],
                function(err) {
                    callback(err);
                });
            }
        }
    });

    model.User.hasMany('locations', Location);

    model.User.register = function(username, password, callback) {
        var user = model.User({
            id: username
        });
        user.setPassword(password, function(err, user) {
            user.addNewLocation({
                lat: 40, long: -65, radius: 750
            }, callback);
        });
    };

    model.User.authenticate = function(username, password, callback) {
        model.User.get(username, function(err, user) {
            if (err && err.message === 'Not found') {
                callback(null, false);
            } else if (err) {
                callback(err);
            } else {
                bcrypt.compare(password, user.hashed_password, function(err, result) {
                    if (err) {
                        callback(err, user);
                    } else if (!result) {
                        callback(model.User.ERR_INVALID_PASSWORD, null);
                    } else {
                        callback(null, user);
                    }
                })
            }
        });
    };

    model.User.ERR_NOT_FOUND = 'ERR_NOT_FOUND';
    model.User.ERR_INVALID_PASSWORD = 'ERR_INVALID_PASSWORD';

    return model;
};