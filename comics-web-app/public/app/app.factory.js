/**
 * Created by anastasiya on 8.11.16.
 */
comicsApp
    .factory('DialogTemplate', [ 'ngDialog', function(ngDialog) {
    return function (url, controller) {
        ngDialog.open({
            template: url,
            controller: controller,
            closeByEscape: true
        });

    }
}])

    .factory('SendData', ['$http', function($http){
    return function($scope, url, data){
        var config = {
            headers : {
                'Content-Type': 'application/json;charset=utf-8;'
            }
        };

        function clearInput(){
            $scope.loginEmail = $scope.loginPassword =
                $scope.registrUsername= $scope.registrEmail =
                    $scope.registrPassword= $scope.registrConfirm= "";
        }

        $http.post( url, data, config)
            .success(function (data) {
                $scope.response = data.message;
            })
            .error(function (data, status, header, config) {
                $scope.response = data.error;
            })
    };





}]);