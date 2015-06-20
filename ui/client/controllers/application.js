'use strict';

angular.module('rezi')
    .controller('ApplicationController', ['$scope', '$rootScope', 'AuthService',
        function($scope, $rootScope, AuthService) {

            $scope.user = $rootScope.currentUser;

            $scope.$on('login', function() {
                $scope.user = $rootScope.currentUser;
            });

            $scope.logout = function() {
                $scope.user = null;
                AuthService.logout();
            }
        }
    ]
);