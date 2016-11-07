/**
 * Created by anastasiya on 5.11.16.
 */
(function () {
    angular.module('comicsapp', [
        'angularModalService',
        'ngRoute',
        'ngResource'
    ])
        .controller('comicsAppCtrl', comicsAppCtrl)
        .config(comicsappConfig)
        .directive("popAuthorizationDialog", popAuthorizationDialog)
        .directive("popRegistrationDialog", popRegistrationDialog)
        .directive("topMenuBar", getTopMenu);

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
            });
    }

    comicsAppCtrl.$inject = [ "ModalService" ];

    function comicsAppCtrl(ModalService) {

        ModalService.showModal({
            templateUrl: 'app/components/user-enter/login/login.html',
            controller: authorizationCtrl
        }).then(function(modal) {
           // modal.element.modal();
        });

    }
    function getTopMenu(){
        return {
            restrict: 'E',
            scope: false,
            templateUrl: 'app/components/top-menu/top-menu.html'
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
                response= data;
            })
            .error(function (data, status, header, config) {
               console.log("Data: " + data +
                   "<hr />status: " + status +
                   "<hr />headers: " + header +
                   "<hr />config: " + config);
            });
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
            if (angular.isDefined(response.error)) {
                $scope.responseLogin = response.error;
            }
        }
    }

    function popAuthorizationDialog() {
        return {
            restrict: 'E',
            scope: false,
            templateUrl: 'app/components/user-enter/login/login.html',
            controller: authorizationCtrl
        }
    }

    function clearRegistrInput(scope){
        scope.registrUsername= scope.registrEmail =
            scope.registrPassword= scope.registrConfirm= "";
    }

    function popRegistrationDialog(){
        return {
            restrict: 'E',
            scope: false,
            templateUrl: 'app/components/user-enter/registr/registr.html',
            controller: function ($scope, $http) {

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
                        var response =sendData($http, '/registr', data);
                        if(angular.isDefined(response.error)){
                            $scope.responseRegistr = response.error;
                        } else {
                            $scope.responseRegistr = "Confirmation was sent on your email";
                            clearRegistrInput($scope);
                        }

                    }
                }
            }
        }
    }
}());