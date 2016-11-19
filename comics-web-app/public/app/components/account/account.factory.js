/**
 * Created by anastasiya on 18.11.16.
 */
comicsApp
    .factory('TokenParser', ['$window', function($window){
        return {
            currentUser : function(){
                var token =  $window.sessionStorage.token;
                var payload = token.split('.')[1];
                payload = $window.atob(payload);
                payload = JSON.parse(payload);
                console.log(payload);
                return {
                    id:     payload.id,
                    email : payload.email
                };
            }
        }
    }])

    .factory('UserPageService', ['GetData', function(GetData){
        function resolve($scope, response){
            $scope.username = response.data.username;
            $scope.avatar = response.data.avatar;
            $scope.email = response.data.email;
        }

        function reject($scope, response){
            console.log(response);
        }

       return {
           load: function($scope, id){
               console.log(id);
               var url = '/user/get/' + id;
               GetData($scope, url, resolve, reject);
           }
       }
    }]);