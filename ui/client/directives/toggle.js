(function() {
    'use strict';

    angular.module('material').directive('mdToggle', function() {
        function link(scope, element, attr) {
            var target = angular.element(attr.mdToggle);
            target.addClass('ng-hide');
            element.on('click', function() {
                target.toggleClass('ng-hide');
            });
        }
        return {
            restrict: 'A',
            link: link
        }
    });
})();