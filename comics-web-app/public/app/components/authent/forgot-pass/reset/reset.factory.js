/**
 * Created by anastasiya on 10.11.16.
 */
comicsApp.factory('ResetPassDialog', ['DialogTemplate', function(DialogTemplate) {

    let currentEmail;
    let currentDialog;

    function resolve($scope, response){
        $scope.response = response.message;
        setButtonDisable($scope.buttonDisabled, false);
    }

    function reject($scope, response){
        console.log(response.error);
        $scope.response = response.error;
        setButtonDisable($scope.buttonDisabled, false);
    }

    resetPassCtrl.$inject = ['$scope', 'PostData'];

    function resetPassCtrl($scope, PostData){

        $scope.sendNewPassData = function() {

            $scope.response = '';

            setButtonDisable($scope.buttonDisabled, true);

            if($scope.password != $scope.confirmedPassword) {
                $scope.response = "Passwords are different";
                return;
            }

            let data = {
                email: currentEmail,
                password: $scope.password,
                confirmed: $scope.confirmedPassword
            };

            PostData($scope, '/user/recover-password', data, resolve, reject);

        }
    }

    function putInnerButton(inner){
        if( document.getElementById('load'))
            document.getElementById('load').innerHTML = inner;
    }

    function setButtonDisable(buttonDisableTrigger, value){
        buttonDisableTrigger = value;
        if(value){
            putInnerButton("Creating...")
        } else {
            putInnerButton("Create")
        }
    }

    return {
        load: function(email){
            currentEmail = email;
            let url = 'app/components/authent/forgot-pass/reset/reset.html';
            let controller = resetPassCtrl;
            currentDialog = DialogTemplate.open(url, controller);
        }
    }


}]);