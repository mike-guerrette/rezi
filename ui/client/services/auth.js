(function() {
    'use strict';

    angular.module('rezi').service('AuthService',
        function($http, $rootScope, $location, jwtHelper, config) {

            var self = this;

            this.login = function(username, password) {
                return $http({
                    method: 'POST',
                    url: config.API_BASE + '/api/token',
                    data: {
                        username: username,
                        password: password
                    }
                }).success(function(res) {
                    self.loadToken(res.token);
                    $rootScope.$broadcast('login');
                });
            };

            this.loadToken = function(token) {
                localStorage.setItem('token', token);
                var payload = jwtHelper.decodeToken(token);
                $rootScope.currentUser = {
                    username: payload.iss
                };
                $http.defaults.headers.common.Authorization = token;
            };

            this.register = function(username, password) {
                return $http({
                    method: 'POST',
                    url: './api/users/register',
                    data: {
                        username: username,
                        password: password
                    }
                }).then(function(res) {
                    console.log('RESPONSE: ', res);
                    console.log('Account created!');
                    self.login(username, password);
                });
            };

            this.logout = function() {
                $rootScope.currentUser = null;
                localStorage.removeItem('token');
                $location.path('/login');
            };

            this.isAuthenticated = function() {
                return !!$rootScope.currentUser;
            };
        }
    );
})();