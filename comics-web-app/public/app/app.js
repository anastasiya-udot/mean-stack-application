/**
 * Created by anastasiya on 5.11.16.
 */
var comicsApp = angular.module('comicsApp', [
        'ngDialog',
        'ngRoute',
        'ngResource'
    ])
        .config(comicsappConfig);

    function comicsappConfig ($routeProvider) {
        $routeProvider
            .when('/', {
                controller: 'initialPageCtrl',
                templateUrl: 'app/components/front-page/front-page.html'
            })
            .when('/myCarousel', {
                controller: 'initialPageCtrl',
                templateUrl: 'app/components/front-page/front-page.html'
            })
            .when('/passwordReset', {
                controller: 'initialPageCtrl',
                templateUrl: 'app/components/front-page/front-page.html'
            })

    }