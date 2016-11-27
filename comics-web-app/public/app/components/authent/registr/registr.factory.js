/**
 * Created by anastasiya on 8.11.16.
 */
comicsApp.factory('RegistrDialog',[ 'DialogTemplate', 'PostData', function(DialogTemplate, PostData) {

    function resolve($scope, response){
        $scope.buttonDisabled = false;
        console.log("here");
        clearInput($scope);
        $scope.response = response.message;
    }

    function reject($scope, response){
        console.log(response.error);
        $scope.response = response.error;
    }

    function clearInput($scope){
        $scope.registrUsername= $scope.registrEmail =
         $scope.registrPassword= $scope.registrConfirm= "";
    }


    registrationCtrl.$inject = [ '$scope' ];

    function registrationCtrl($scope){
        $scope.buttonDisabled = false;

        $scope.sendRegistrData = function(){
            if ($scope.password !== $scope.confirmedPassword){
                $scope.response = "Check your passwords";
            } else {
                let data = {
                    username: $scope.username,
                    email: $scope.email,
                    password: $scope.password,
                    confirmed: $scope.confirmedPassword
                };

                $scope.buttonDisabled = true;
                PostData($scope, '/user/registr', data, resolve, reject);

            }
        }
    }


   return {
      load: function(){
           let url = 'app/components/authent/registr/registr.html';
           let controller = registrationCtrl;
           DialogTemplate.open( url, controller);
       }
   }

}]);

