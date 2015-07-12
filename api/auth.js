'use strict';

var jwt = require('jwt-simple'),
    moment = require('moment'),
    _ = require('lodash');


var controller;


module.exports.init = function(config, db) {

    if (controller) {
        return controller;
    }
    controller = {};

    function _unauthorized(res) {
        return res.status(401).json({
            code: 401,
            message: 'Not authorized'
        });
    }

    controller._token = function(username, options) {
        //Generate JSON Web token
        var expires = moment()
            .add(config.TOKEN_TLL_DAYS, 'days')
            .valueOf();
        //Encode inner token
        var token = jwt.encode(_.merge(options || {}, {
            iss: username,
            exp: expires
        }), config.SECRET_KEY);

        return {
            token: token,
            expires: expires
        }
    };

    controller.getToken = function(req, res) {
        var username = req.body.username,
            password = req.body.password;

        if (!username || !password) {
            return _unauthorized(res);
        }

        db.User.authenticate(username, password, function(err, user) {
            if (err || !user) {
                return _unauthorized(res);
            }
            console.log('User: ', JSON.stringify(user));
            res.json(controller._token(user.id, {

            }));
        });
    };

    controller.tokenRequired = function(req, res, next) {
        var token = req.headers.authorization;
        if (!token) {
            return _unauthorized(res);
        }
        try {
            var decoded = jwt.decode(token, config.SECRET_KEY);
            if (decoded.exp <= Date.now()) {
                return _unauthorized(res);
            }
            db.User.get(decoded.iss, function(err, user) {
                if (err) {
                    return _unauthorized(res);
                }
                req.user = user;
                next();
            });
        } catch (err) {
            return _unauthorized(res);
        }
    };

    return controller;
};