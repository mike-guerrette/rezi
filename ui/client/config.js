(function() {
    'use strict';

    angular.module('rezi').factory('config', function() {
        return {
            API_BASE: 'http://localhost:4000'
        }
    });
})();