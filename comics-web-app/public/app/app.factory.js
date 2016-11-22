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

    .factory('PostData', ['$http', function($http){
    return function($scope, url, data, resolve){
        const config = {
            headers : {
                'Content-Type': 'application/json;charset=utf-8;'
            }
        };

        $http.post( url, data, config)
            .success(function (data) {
                if( angular.isDefined(data.error)){
                    console.log(data.error);
                    $scope.response = data.error;
                } else {
                    resolve($scope, data);
                }
            })
    };

}])

    .factory('GetData', ['$http', function($http){
        return function($scope, url, resolve, reject){
            const config = {
                headers : {
                    'Content-Type': 'application/json;charset=utf-8;'
                }
            };

            $http.get( url, config)
                .then(
                    (response) => { resolve($scope, response)},
                    (response) => { reject($scope, response)}
                )
        };

    }])

    .factory('SessionService',[ '$window', '$rootScope', '$location', function($window, $rootScope, $location){

        return {

            isLogged: false,

            observe: function(){
                $rootScope.loggedIn = false;
                if ($window.sessionStorage.token){
                    $rootScope.loggedIn = true;
                }
            },

            startSession: function(token){
                $window.sessionStorage.token = token;
            },

            destroySession: function(){
                delete $window.sessionStorage.token;
                $location.path('/');
            },

            getSessionUserId : function(){
                let token =  $window.sessionStorage.token;
                if(token){
                    let payload = token.split('.')[1];
                    payload = $window.atob(payload);
                    payload = JSON.parse(payload);
                    return payload.id;
                }
                return null;
            }
        }

    }]);
