(function() {
    'use strict';

    angular.module('rezi').service('AuthService',
        function($http, $rootScope, $location, $localStorage) {

            var self = this;

            this.login = function(username, password) {
                return $http({
                    method: 'POST',
                    url: 'http://localhost:4000/api/token',
                    data: {
                        username: username,
                        password: password
                    }
                }).success(function(res) {
                    $rootScope.currentUser = {username: res.user, token: res.token};
                    $localStorage.token = res.token;
                    $localStorage.userID = res.user;
                    $rootScope.$broadcast('login');
                    $location.path('/');
                });
            };

            this.checkToken = function(cb) {
                console.log('Checking login..');
                var token = $localStorage.token;
                var user = $localStorage.userID;
                if (!token) {
                    console.log('No token!');
                    $rootScope.currentUser = null;
                    $location.path('/login');
                    cb();
                } else {
                    console.log('Found token.');
                    $rootScope.$broadcast('login');
                    $rootScope.currentUser = {username: user, token: token};
                    cb();
                }
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
                delete $localStorage.token;
                delete $localStorage.user;
                $location.path('/login');
            };

            this.isAuthenticated = function() {
                return !!$rootScope.currentUser;
            };
        }
    );
})();