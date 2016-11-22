/**
 * Created by anastasiya on 10.11.16.
 */
comicsApp.factory('ResetPassDialog', ['DialogTemplate', function(DialogTemplate) {

    var currentEmail;
    var currentDialog;

    function resolve($scope, response){
        $scope.response = response.message;
    }

    resetPassCtrl.$inject = ['$scope', 'PostData'];

    function resetPassCtrl($scope, PostData){
            $scope.sendNewPassData = function() {
                if($scope.password === $scope.confirmedPassword){
                    var data = {
                        email: currentEmail,
                        password: $scope.password,
                        confirmed: $scope.confirmedPassword
                    };
                    PostData($scope, '/user/recover-password', data, resolve);
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