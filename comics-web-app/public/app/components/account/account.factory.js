/**
 * Created by anastasiya on 18.11.16.
 */
comicsApp

    .factory('UserRoleService', [ 'SessionService', function(SessionService){
        return {
            getRole: function(id){
                var myId = SessionService.getSessionUserId();
                if (myId){
                    if(myId == id){
                        return "owner";
                    } else {
                        return "guest";
                    }
                } else {
                    return "unauthorized";
                }
            }
        }
    }])

    .factory('AccountInfoService', ['GetData', '$location', function(GetData, $location){

        var spareAvatar = 'https://res.cloudinary.com/dq83k7kbp/image/upload/c_scale,h_200,w_200/v1479736672/batman_04_jbnqtq.jpg';
        var returnId;

        function resolve($scope, response){
            $scope.user = {
                username : response.data.username,
                avatar : response.data.avatar || spareAvatar,
                email : response.data.email
            };
            returnId(getId());
        }

        function reject($scope, response){
            $scope.user = null;
            returnId(null);
            console.log(response);
        }

        function getId(){
            var url = $location.absUrl();
            return url.split('/').splice(-1,1);
        }

        return {
          getInfo: function($scope, callback){
               var url = '/user/get/' + getId();
               returnId = callback;
               GetData($scope, url, resolve, reject);
           }
       }
    }])

    .factory('AccountButtonsService',['ChangeInfoDialog', function(ChangeInfoDialog){

        return {
             start: function($scope){
                 ListenChangeInfoButton($scope)
             }
        };
        function ListenChangeInfoButton($scope){
            $scope.changeUserInfo = function(){
                ChangeInfoDialog.load($scope.user);
            }
        }
    }]);