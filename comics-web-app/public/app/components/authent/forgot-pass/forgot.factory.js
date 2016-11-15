/**
 * Created by anastasiya on 9.11.16.
 */
comicsApp.factory('ForgotPassDialog', ['DialogTemplate', function(DialogTemplate) {

    function resolve($scope, response){
        $scope.response = response.message;
    }

    enterEmailCtrl.$inject = ['$scope', 'PostData'];

    function enterEmailCtrl($scope, PostData){

        $scope.sendEmailData = function() {
            var data = {
                email: $scope.forgotPassEmail,
            };
            PostData($scope, '/user/forgot-password', data, resolve);
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