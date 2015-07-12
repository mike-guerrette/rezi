(function() {
    'use strict';

    angular.module('rezi', [
        'ui.router',
        'uiGmapgoogle-maps',
        'angular-jwt'
    ])
        .config(function(uiGmapGoogleMapApiProvider) {
            uiGmapGoogleMapApiProvider.configure({});
        })
        .run(function(AuthService, $location, $rootScope) {
            var token = localStorage.getItem('token');
            if (token !== null) {
                AuthService.loadToken(token);
            }
            $rootScope.$on('stateChangeStart', function() {
                if(!AuthService.isAuthenticated()) {
                    $location.path('/login');
                }
            });
    });
})();