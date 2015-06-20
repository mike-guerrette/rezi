'use strict';

var _ = require('lodash');

var controller = {};

module.exports.init = function(db) {

    controller.get = function(req, res) {
        db.User.get(req.params.id, function(err, user) {
            if (err && err === 'Not found') {
                res.status(404).json({
                    code: 404,
                    message: 'User not found'
                });
            } else if (err) {
                res.status(500).json({
                    code: 500,
                    message: err.message
                });
            } else {
                var _user = _.cloneDeep(user);
                user.getLocations(function(err, locations) {
                    if (err) {console.error(err, err.stack);}
                    else {
                        _user.locations = locations;
                        delete _user.hashed_password;
                        res.status(200).json({
                            code: 200,
                            message: 'OK',
                            data: _user
                        });
                    }
                });
            }
        });
    };

    controller.register = function(req, res) {
        db.User.register(req.body.username, req.body.password, function(err) {
            console.log('username: ', req.body.username);
            if (err) {
                console.error(err, err.stack);
                res.status(500).json({
                    code: 500,
                    message: 'Failed to create account',
                    data: {error: err}
                })
            } else {
                res.status(200).json({
                    code: 200,
                    message: 'Account created',
                    data: req.session
                })
            }
        });
    };

    return controller;
};