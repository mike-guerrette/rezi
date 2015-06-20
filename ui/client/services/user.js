(function() {
    'use strict';

    angular.module('rezi').service('UserService',
        function($http) {
            this.get = function(id, callback) {
                return $http.get('/api/users/' + id)
                    .error(function(res) {
                        callback(res.message);
                    })
                    .success(function(res) {
                        callback(null, res.data);
                    })
            };
        }
    );
})();