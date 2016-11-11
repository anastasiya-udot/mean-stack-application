/**
 * Created by anastasiya on 10.11.16.
 */
comicsApp.factory('ResetPassDialog', ['DialogTemplate', function(DialogTemplate) {

    function resolve($scope, response){
        console.log("Email confirmed");
    }

    resetPassCtrl.$inject = ['$scope', 'SendData'];

    function resetPassCtrl($scope, SendData){
        var password = $scope.newPassword;
        var confirmPassword = $scope.newPasswordConfirm;

        if(password === confirmPassword){
            $scope.sendNewPassData = function() {
                var data = {
                    password: password
                };
                SendData($scope, '/forgot', data, resolve);
            }
        } else {
            $scope.response = "Passwords are different"
        }
    }

    return {
        load: function(){
            var url = 'app/components/authent/forgot-pass/reset.html';
            var controller = resetPassCtrl;
            DialogTemplate.open(url, controller);
        }
    }


}]);