(function() {
    'use strict';

    angular.module('rezi').service('LocationService',
        function($http, $rootScope) {

            this.add = function(username, location, cb) {
                $http
                    .post('./api/users/' + username + '/locations', {
                        username: username,
                        location: location
                    })
                    .error(function(res) {
                        cb(res.message);
                    })
                    .success(function() {
                        cb(null);
                    });
            };

            this.update = function(id, location, cb) {
                $http
                    .put('./apisers/' + username + '/locations', {
                        username: username,
                        location: location
                    })
                    .error(function(res) {
                        cb(res.message);
                    })
                    .success(function() {
                        cb(null);
                    });
            };
        }
    );
})();