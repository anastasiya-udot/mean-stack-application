/**
 * Created by anastasiya on 10.11.16.
 */
comicsApp.factory('ResetPassDialog', ['DialogTemplate', function(DialogTemplate) {

    var currentEmail;
    var currentDialog;

    function resolve($scope, response){
        $scope.response = response.message;
    }

    resetPassCtrl.$inject = ['$scope', 'SendData'];

    function resetPassCtrl($scope, SendData){
            $scope.sendNewPassData = function() {
                var password = $scope.newPassword;
                var confirmPassword = $scope.newPasswordConfirm;
                if(password === confirmPassword){
                    var data = {
                        email: currentEmail,
                        password: password,
                        confirmed: confirmPassword
                    };
                    SendData($scope, '/recover', data, resolve);
                } else {
                    $scope.response = "Passwords are different"
                }
            }
    }

    return {
        load: function(email){
            currentEmail = email;
            var url = 'app/components/authent/forgot-pass/reset.html';
            var controller = resetPassCtrl;
            currentDialog = DialogTemplate.open(url, controller);
        }
    }


}]);