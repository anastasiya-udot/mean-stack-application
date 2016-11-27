/**
 * Created by anastasiya on 9.11.16.
 */
comicsApp.factory('ForgotPassDialog', ['DialogTemplate', function(DialogTemplate) {

    function resolve($scope, response){
        $scope.response = response.message;
    }

    function reject($scope, response){
        console.log(response.error);
        $scope.response = response.error;
    }

    enterEmailCtrl.$inject = ['$scope', 'PostData'];

    function enterEmailCtrl($scope, PostData){

        $scope.sendEmailData = function() {
            let data = {
                email: $scope.forgotPassEmail,
            };
            PostData($scope, '/user/forgot-password', data, resolve, reject);
        }
    }

    return {
        load: function(){
            let url = 'app/components/authent/forgot-pass/forgot.html';
            let controller = enterEmailCtrl;
            DialogTemplate.open(url, controller);
        }
    }


}]);