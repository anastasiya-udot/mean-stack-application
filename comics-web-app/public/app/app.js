/**
 * Created by anastasiya on 5.11.16.
 */
let comicsApp = angular.module('comicsApp', [
        'ngDialog',
        'ngRoute',
        'ngResource',
        'ui.bootstrap',
        'ngAnimate',
        'ngFileUpload'
    ])
        .config(comicsappConfig)

        .run(function($window, $rootScope) {
            $rootScope.online = navigator.onLine;
            $window.addEventListener("offline", function() {
                $rootScope.$apply(function() {
                    $rootScope.online = false;
                });
            }, false);

            $window.addEventListener("online", function() {
                $rootScope.$apply(function() {
                    $rootScope.online = true;
                });
            }, false);
        });

    function comicsappConfig ($routeProvider) {


        $routeProvider
            .when('/', {
                controller: 'initialPageCtrl',
                templateUrl: 'app/components/front-page/front-page.html'
            })
            .when('/user/reset/:token', {
                controller: 'resetPasswordPageCtrl',
                templateUrl: 'app/components/front-page/front-page.html'
            })
            .when('/user/confirm-registr/:token',{
                controller: 'confirmRegistrPageCtrl',
                templateUrl: 'app/components/front-page/front-page.html'
            })
            .when('/gallery', {
                controller: 'browseGalleryCtrl',
                templateUrl: 'app/components/gallery/gallery.html'
            })
            .when('/account/:id', {
                controller: 'browseAccountCtrl',
                templateUrl: 'app/components/account/account.html'
            })
            .when('/account/confirm-change-email/:token', {
                controller: 'confirmEmailChangeCtrl',
                templateUrl: 'app/components/front-page/front-page.html'
            })
            .when('/comics/:token', {
                controller: 'comicsPageCtrl',
                templateUrl: 'app/components/comics/comics-page/comics-page.html'
            });

    }
