/**
 * Created by anastasiya on 8.11.16.
 */
comicsApp.factory('LoginDialog', ['DialogTemplate', 'PostData', 'SessionService', function(DialogTemplate, PostData, SessionService) {

    let currentDialog;

    function resolve($scope, response){
        clearInput($scope);
        startSession(response.token);
        $scope.buttonDisabled = false;
        DialogTemplate.close(currentDialog);
    }

    function reject($scope, response){
        console.log(response.error);
        $scope.buttonDisabled = false;
        $scope.response = response.error;
    }

    function startSession(token){
        SessionService.isLogged = true;
        SessionService.startSession(token);
        SessionService.observe();
    }

    function clearInput($scope){
        $scope.loginEmail = $scope.loginPassword = "";
    }

    function checkFieldsEmpty($scope){
        return $scope.loginEmail && $scope.loginPassword;
    }


    authorizationCtrl.$inject = [ '$scope',  'ForgotPassDialog' ];

    function authorizationCtrl($scope, ForgotPassDialog){

        $scope.buttonDisabled = false;


        $scope.sendAuthData = function() {

            let data = {
                email: $scope.loginEmail,
                password: $scope.loginPassword
            };
            if (checkFieldsEmpty($scope)){
                $scope.buttonDisabled = true;
                PostData($scope, '/user/login', data, resolve, reject);
            }
        };

        $scope.openForgotPassMenu = function(){
            DialogTemplate.close(currentDialog);
            ForgotPassDialog.load();
        }

    }

    return {
        load: function(){
            let url = 'app/components/authent/login/login.html';
            let controller = authorizationCtrl;
            currentDialog = DialogTemplate.open(url, controller);
        }
    }


}]);