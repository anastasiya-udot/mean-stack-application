/**
 * Created by anastasiya on 8.11.16.
 */
comicsApp.factory('LoginDialog', ['DialogTemplate', 'SendData',  function(DialogTemplate, SendData) {

    var currentDialog;

    function resolve($scope, response){
        console.log(response.token);
        clearInput($scope);
    }

    function clearInput($scope){
        $scope.loginEmail = $scope.loginPassword = "";
    }

    authorizationCtrl.$inject = [ '$scope',  'ForgotPassDialog' ];

    function authorizationCtrl($scope, ForgotPassDialog){
        $scope.sendAuthData = function() {
            var data = {
                email: $scope.loginEmail,
                password: $scope.loginPassword
            };
            SendData($scope, '/user/login', data, resolve);
        };

        $scope.openForgotPassMenu = function(){
            DialogTemplate.close(currentDialog);
            ForgotPassDialog.load();
        }

    }

    return {
        load: function(){
            console.log("login");
            var url = 'app/components/authent/login/login.html';
            var controller = authorizationCtrl;
            currentDialog = DialogTemplate.open(url, controller);
        }
    }


}]);