/**
 * Created by anastasiya on 8.11.16.
 */
comicsApp.factory('RegistrDialog',[ 'DialogTemplate', 'PostData', function(DialogTemplate, PostData) {

    function resolve($scope, response){
        clearInput($scope);
        $scope.response = response.message;
        setButtonDisable($scope.buttonDisabled, false);
    }

    function reject($scope, response){
        console.log(response.error);
        $scope.response = response.error;
        setButtonDisable($scope.buttonDisabled, false);
    }

    function clearInput($scope){
        $scope.registrUsername= $scope.registrEmail =
         $scope.registrPassword= $scope.registrConfirm= "";
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
            putInnerButton("Sign up")
        }
    }

    registrationCtrl.$inject = [ '$scope' ];

    function registrationCtrl($scope){

        $scope.sendRegistrData = function(){

            setButtonDisable($scope.buttonDisabled, true);

            if ($scope.password != $scope.confirmedPassword){
                $scope.response = "Check your passwords";
                setButtonDisable($scope.buttonDisabled,false);
                return;
            }

            let data = {
                username: $scope.username,
                email: $scope.email,
                password: $scope.password,
                confirmed: $scope.confirmedPassword
            };

            PostData($scope, '/user/registr', data, resolve, reject);
        };

    }


   return {
      load: function(){
           let url = 'app/components/authent/registr/registr.html';
           let controller = registrationCtrl;
           DialogTemplate.open( url, controller);
       }
   }

}]);

