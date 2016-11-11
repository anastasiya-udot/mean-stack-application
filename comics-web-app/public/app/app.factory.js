/**
 * Created by anastasiya on 8.11.16.
 */
comicsApp
    .factory('DialogTemplate', [ 'ngDialog', function(ngDialog) {
    return {
        open: function (url, controller) {
            return ngDialog.open({
                template: url,
                controller: controller,
                closeByEscape: true
            });
        },

        close: function(dialog){
            ngDialog.close(dialog);
        }
    }
}])

    .factory('SendData', ['$http', function($http){
    return function($scope, url, data, resolve){
        var config = {
            headers : {
                'Content-Type': 'application/json;charset=utf-8;'
            }
        };

        $http.post( url, data, config)
            .success(function (data) {
                console.log(data);
                if( angular.isDefined(data.error)){
                    console.log(data.error);
                    $scope.response = data.error;
                } else {
                    resolve($scope, data);
                }
            })
    };
}]);