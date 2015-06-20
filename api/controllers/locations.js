'use strict';

var _ = require('lodash');

var controller = {};

module.exports.init = function(db) {

    controller.get = function(req, res) {
        db.Location.get(req.params.id, function(err, location) {
            if (err) {
                console.error(err, err.stack);
                res.status(500).json({
                    message: err
                });
            } else {
                res.status(200).json({
                    message: 'OK',
                    data: location || []
                });
            }
        });
    };

    controller.add = function(req, res) {
        db.User.get(req.body.username, function(err, user) {
            if (err) {
                console.err(err)
            } else {
                user.addNewLocation(req.body.location, function(err) {
                    if (err) {
                        console.log(err);
                        res.status(500).json({
                            message: err
                        });
                    } else {
                        res.status(200).json({
                            message: 'OK'
                        });
                    }
                });
            }
        });
    };

    controller.update = function(req, res) {
        db.Location.get(req.params.id, function(err, location) {
            if (err && err.message === 'Not found') {
                res.status(404).json({
                    message: err
                });
            }
            else if (err) {
                console.error(err, err.stack);
                res.status(500).json({
                    message: err
                });
            } else {
                var _location = _.cloneDeep(location);
                _location.radius = req.body.radius;
                _location.lat = req.body.lat;
                _location.long = req.body.long;
                _location.save(function(err) {
                    if (err) {
                        console.error(err, err.stack);
                        res.status(500).json({
                            message: err
                        });
                    } else {
                        res.status(200).json({
                            message: 'OK',
                            data: location || []
                        });
                    }
                });
            }
        });
    };

    return controller;
};