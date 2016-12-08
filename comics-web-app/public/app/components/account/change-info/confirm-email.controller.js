/**
 * Created by anastasiya on 25.11.16.
 */
comicsApp
    .controller('confirmEmailChangeCtrl', confirmEmailChangeCtrl);

    confirmEmailChangeCtrl.$inject = ['$scope', '$location', 'ConfirmEmailChangeService', 'InitialPageLoader', 'LoginDialog'];

    function confirmEmailChangeCtrl($scope, $location, ConfirmEmailChangeService, InitialPageLoader, LoginDialog){

        InitialPageLoader.load($scope);
        ConfirmEmailChangeService.start($location, $scope);
        LoginDialog.load();
    }