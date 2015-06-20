'use strict';

angular.module('rezi')
    .controller('HomeController', ['$scope', '$rootScope', 'uiGmapGoogleMapApi', 'UserService', 'LocationService',
        function($scope, $rootScope, uiGmapGoogleMapApi, UserService, LocationService) {
            $scope.message = 'Hello World.';

            UserService.get($rootScope.currentUser.username, function(err, data) {
                if (err) {console.log(err);}
                $scope.user = data;

                $scope.map = {
                    center: {
                        latitude:  $scope.user.locations[0].lat,
                        longitude: $scope.user.locations[0].long
                    },
                    zoom: 14
                };

                $scope.options = {scrollwheel: false};
                $scope.circles = [
                    {
                        id: 1,
                        center: {
                            latitude:  $scope.user.locations[0].lat,
                            longitude: $scope.user.locations[0].long
                        },
                        radius: $scope.user.locations[0].radius,
                        stroke: {
                            color: '#08B21F',
                            weight: 2,
                            opacity: 1
                        },
                        fill: {
                            color: '#08B21F',
                            opacity: 0.5
                        },
                        geodesic: true, // optional: defaults to false
                        draggable: true, // optional: defaults to false
                        clickable: true, // optional: defaults to true
                        editable: true, // optional: defaults to false
                        visible: true, // optional: defaults to true
                        control: {},
                        events: {
                            radius_changed: function() {
                                console.log('Updating location radius...');
                                LocationService.update($scope.user.id, {
                                    radius: $scope.circles[0].radius,
                                    lat: $scope.circles[0].center.latitude,
                                    long: $scope.circles[0].center.longitude
                                }, function(err) {
                                    if (err) {console.log(err)}
                                })
                            }
                        }
                    }
                ];
            });

            reziAudio.play();



            console.log('MAP: ', $scope.map);
            console.log('CIRCLES: ', $scope.circles);

            $scope.resize = function() {
                console.log('Resized!');
            };

            uiGmapGoogleMapApi.then(function(maps) {
                console.log('Maps ready!');
            });
        }
    ]
);