'use strict';

angular.module('rezi')
    .controller('LoginController', ['$scope', 'AuthService',
        function($scope, AuthService) {
            $scope.message = 'Please log in!';

            $scope.sendLogin = function() {
                AuthService.login($scope.username, $scope.password)
                    .then(function(data) {
                        console.log('DATA', data);
                    })
            };

            $scope.signUp = function() {
                console.log('Signing up with..');
                console.log('Username: ', $scope.username);
                console.log('Password: ', $scope.password);
                AuthService.register($scope.username, $scope.password)
                    .then(function() {
                        console.log('Signed Up!');
                        $('#sign-up-form').modal('hide');
                    });
            };

        }
    ]
);