/**
 * Created by anastasiya on 9.11.16.
 */
comicsApp.factory('ForgotPassDialog', ['DialogTemplate', function(DialogTemplate) {

    function resolve($scope, response){
        $scope.response = response.message;
        setButtonDisable($scope.buttonDisabled, false);

    }

    function reject($scope, response){
        console.log(response.error);
        $scope.response = response.error;
        setButtonDisable($scope.buttonDisabled, false);
    }

    function putInnerButton(inner){
        if( document.getElementById('load'))
            document.getElementById('load').innerHTML = inner;
    }

    function setButtonDisable(buttonDisableTrigger, value){
        buttonDisableTrigger = value;
        if(value){
            putInnerButton("Sending...")
        } else {
            putInnerButton("Send")
        }
    }

    enterEmailCtrl.$inject = ['$scope', 'PostData'];

    function enterEmailCtrl($scope, PostData){

        $scope.sendEmailData = function() {

            setButtonDisable($scope.buttonDisabled, true);
            $scope.response = '';

            let data = {
                email: $scope.forgotPassEmail,
            };
            PostData($scope, '/user/forgot-password', data, resolve, reject);
        }
    }

    return {
        load: function(){
            let url = 'app/components/authent/forgot-pass/forgot/forgot.html';
            let controller = enterEmailCtrl;
            DialogTemplate.open(url, controller);
        }
    }


}]);