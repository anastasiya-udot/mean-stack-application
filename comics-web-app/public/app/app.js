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
                templateUrl: 'app/components/slider/slider.html'
            })
            .when('/myCarousel', {
                controller: 'initialPageCtrl',
                templateUrl: 'app/components/slider/slider.html'
            })

    }


 /*       .controller('comicsAppCtrl', comicsAppCtrl)
        .directive("topMenuBar", getTopMenuCtrl);

    comicsappConfig.$inject = [ '$routeProvider' ];

    function comicsappConfig ($routeProvider) {
        $routeProvider
            .when('/', {
                controller: 'comicsAppCtrl',
                templateUrl: 'app/components/slider/slider.html'
            })
            .when('/myCarousel', {
                controller: 'comicsAppCtrl',
                templateUrl: 'app/components/slider/slider.html'
            })

    }

    comicsAppCtrl.$inject = [ '$scope', 'ngDialog' ];

    function comicsAppCtrl($scope, ngDialog) {
        angular.element(document).ready(function () {
            getDialogCreators($scope, ngDialog);
        });
    }

    function getDialogCreators($scope, ngDialog){
        $scope.popAuthorizationDialog = function () {
            var url = 'app/components/authent/login/login.html';
            var controller = authorizationCtrl;
            openNgDialog($scope,ngDialog, url, controller);
        };

        $scope.popRegistrationDialog = function () {
            var url = 'app/components/authent/registr/registr.html';
            var controller = registrationCtrl;
            openNgDialog($scope, ngDialog, url, controller);
        };
    }

    function openNgDialog($scope, ngDialog, url, controller){
        ngDialog.open({
            template: url,
            controller: controller,
            closeByEscape : true,
            scope: $scope
        });
    }

    function getTopMenuCtrl(){
        return {
            restrict: 'E',
            scope: false,
            templateUrl: 'app/components/top-menu/top-menu.html',
            controller: function($scope, ngDialog){
                getDialogCreators($scope, ngDialog)
            }
        }
    }


    function sendData(http, url, data){
        var config = {
            headers : {
                'Content-Type': 'application/json;charset=utf-8;'
            }
        };
        var response = {};



            http.post( url, data, config)
                .success(function (data) {
                    console.log(data);
                    response = data;
                    resolve();
                })
                .error(function (data, status, header, config) {
                    console.log("Data: " + data +
                        "<hr />status: " + status +
                        "<hr />headers: " + header +
                        "<hr />config: " + config);
                    reject();
                });

        console.log("here " + response);
        return response;
    }



   authorizationCtrl.$inject = [ '$scope', '$http' ];
    function authorizationCtrl($scope, $http){
        $scope.sendAuthData = function() {
            var data = {
                email: $scope.loginEmail,
                password: $scope.loginPassword
            };
            var response = sendData($http, '/login', data);
            console.log(response);
            if (angular.isDefined(response.error)) {

                $scope.responseLogin = response.error;
            }
        }
    }

    registrationCtrl.$inject = [ '$scope', '$http' ];
    function registrationCtrl($scope, $http){
        $scope.sendRegistrData = function(){
            if ($scope.registrPassword !== $scope.registrConfirm){
                $scope.responseRegistr = "Passwords are different";
            } else {
                var data = {
                    username: $scope.registrUsername,
                    email: $scope.registrEmail,
                    password: $scope.registrPassword,
                    confirmedPassword: $scope.registrConfirm
                };
                var response = sendData($http, '/registr', data);
                if(angular.isDefined(response.error)){
                    $scope.responseRegistr = response.error;
                } else {
                    $scope.responseRegistr = "Confirmation was sent on your email";
                    clearRegistrInput($scope);
                }

            }
        }
    }

    function clearRegistrInput(scope){
        scope.registrUsername= scope.registrEmail =
            scope.registrPassword= scope.registrConfirm= "";
    }

}());*/