/**
 * Created by anastasiya on 8.11.16.
 */
comicsApp.factory('AuthenticationButtons', ['LoginDialog', 'RegistrDialog', function(LoginDialog, RegistrDialog){
    return{
        listenPopDialogButtons: function($scope){

            $scope.popAuthorizationDialog =function(){
                LoginDialog.load();
            };

            $scope.popRegistrationDialog = function(){
                RegistrDialog.load();
            }
        }
    }

}]);
