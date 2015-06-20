'use strict';

var async = require('async');
var model;

module.exports = function(orm) {
    if (model) {
        return model;
    }
    model = {};

    model.Location = orm.define('location', {
        id: {type: 'serial', key: true},
        radius: {type: 'number'},
        lat: {type: 'number', required: true},
        long: {type: 'number', required: true}
    }, {
        cache: true,
        methods: {}
    });

    return model;
};