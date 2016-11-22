/**
 * Created by anastasiya on 8.11.16.
 */
comicsApp.factory('RegistrDialog',[ 'DialogTemplate', 'PostData', function(DialogTemplate, PostData) {

    function resolve($scope, response){
        $scope.buttonDisabled = false;
        clearInput($scope);
        $scope.response = response.message;
    }

    function clearInput($scope){
        $scope.registrUsername= $scope.registrEmail =
         $scope.registrPassword= $scope.registrConfirm= "";
    }

    function checkFieldsEmpty($scope){
        return $scope.registrUsername && $scope.registrEmail &&
            $scope.registrPassword && $scope.registrConfirm;
    }


    registrationCtrl.$inject = [ '$scope' ];

    function registrationCtrl($scope){
        $scope.buttonDisabled = false;

        $scope.sendRegistrData = function(){
            if ($scope.password !== $scope.confirmedPassword){
                $scope.response = "Passwords are different";
            } else {

                var data = {
                    username: $scope.username,
                    email: $scope.email,
                    password: $scope.password,
                    confirmed: $scope.confirmedPassword
                };

                if (checkFieldsEmpty($scope)){
                    $scope.buttonDisabled = true;
                    PostData($scope, '/user/registr', data, resolve);
                }
            }
        }
    }


   return {
      load: function(){
           var url = 'app/components/authent/registr/registr.html';
           var controller = registrationCtrl;
           DialogTemplate.open( url, controller);
       }
   }

}]);

