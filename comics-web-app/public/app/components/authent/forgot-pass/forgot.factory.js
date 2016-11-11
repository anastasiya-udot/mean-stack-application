/**
 * Created by anastasiya on 9.11.16.
 */
comicsApp.factory('ForgotPassDialog', ['DialogTemplate', function(DialogTemplate) {

    function resolve($scope, response){
        console.log("Email confirmed");
    }

    enterEmailCtrl.$inject = ['$scope', 'SendData'];

    function enterEmailCtrl($scope, SendData){

        $scope.sendEmailData = function() {
            var data = {
                email: $scope.forgotPassEmail,
            };
            SendData($scope, '/forgot', data, resolve);
        }
    }

    return {
        load: function(){
            var url = 'app/components/authent/forgot-pass/forgot.html';
            var controller = enterEmailCtrl;
            DialogTemplate.open(url, controller);
        }
    }


}]);