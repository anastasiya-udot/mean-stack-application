/**
 * Created by anastasiya on 8.11.16.
 */
comicsApp.factory('LoginDialog', ['DialogTemplate', 'SendData', function(DialogTemplate, SendData) {

    var currentScope = {};

    function authorizationCtrl($scope){
        $scope.sendAuthData = function() {
            console.log($scope);
            var data = {
                email: $scope.loginEmail,
                password: $scope.loginPassword
            };
            SendData($scope, '/login', data);
      /*      console.log(response);
            if (angular.isDefined(response.error)) {

                $scope.responseLogin = response.error;
            }*/
        }
    }

    return {
        load: function(){
            var url = 'app/components/authent/login/login.html';
            var controller = authorizationCtrl;
            DialogTemplate(url, controller);
        }
    }


}]);