(function() {
    'use strict';

    angular.module('rezi', [
        'ui.router',
        'uiGmapgoogle-maps',
        'ngStorage'
    ])
        .config(function(uiGmapGoogleMapApiProvider) {
            uiGmapGoogleMapApiProvider.configure({});
        })
        .run(function(AuthService, $location, $rootScope, $localStorage, $http) {
            var token = $localStorage.token;
            var user = $localStorage.userID;
            if (!token) {
                $rootScope.currentUser = null;
                $location.path('/login');
            } else {
                $http.defaults.headers.common.Authorization = token;
                $rootScope.currentUser = {username: user, token: token};
            }
            $rootScope.$on('stateChangeStart', function() {
                if(!AuthService.isAuthenticated()) {
                    $location.path('/login');
                }
            });
    });
})();