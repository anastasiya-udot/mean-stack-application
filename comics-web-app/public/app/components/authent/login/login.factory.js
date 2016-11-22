/**
 * Created by anastasiya on 8.11.16.
 */
comicsApp.factory('LoginDialog', ['DialogTemplate', 'PostData', 'SessionService', function(DialogTemplate, PostData, SessionService) {

    let currentDialog;

    function resolve($scope, response){
        clearInput($scope);
        startSession(response.token);
        DialogTemplate.close(currentDialog);
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
                PostData($scope, '/user/login', data, resolve);
                $scope.buttonDisabled = false;
            }
        };

        $scope.openForgotPassMenu = function(){
            DialogTemplate.close(currentDialog);
            ForgotPassDialog.load();
        }

    }

    return {
        load: function(){
            var url = 'app/components/authent/login/login.html';
            var controller = authorizationCtrl;
            currentDialog = DialogTemplate.open(url, controller);
        }
    }


}]);