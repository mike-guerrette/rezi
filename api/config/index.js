'use strict';

var _ = require('lodash'),
    defaults = require('./defaults');

//Load local settings if present
var local;
try {
    local = require('./local');
} catch(e) {
    local = {};
}

// Set environment
defaults.env = process.env.NODE_ENV || 'development';
var env = {};
if (defaults.env && defaults.env !== 'development') {
    env = require('./' + defaults.env);
}

//Load configs together
module.exports = _.merge(
    defaults,
    local,
    env
);