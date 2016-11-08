/**
 * Created by anastasiya on 8.11.16.
 */
comicsApp.factory('RegistrDialog',[ 'DialogTemplate', 'SendData', function(DialogTemplate, SendData) {

    var currentScope = {};

    registrationCtrl.$inject = [ '$scope' ];

    function registrationCtrl($scope){

        $scope.sendRegistrData = function(){
            if ($scope.registrPassword !== $scope.registrConfirm){
                $scope.response = "Passwords are different";
            } else {
                var data = {
                    username: $scope.registrUsername,
                    email: $scope.registrEmail,
                    password: $scope.registrPassword,
                    confirmedPassword: $scope.registrConfirm
                };
                SendData($scope, '/registr', data);
            }
        }
    }


   return {
      load: function(){
           var url = 'app/components/authent/registr/registr.html';
           var controller = registrationCtrl;
           DialogTemplate( url, controller);
       }
   }

}]);

