/**
 * Created by anastasiya on 21.11.16.
 */
comicsApp
    .factory('ChangeInfoDialog', [ 'DialogTemplate', 'PostData', function(DialogTemplate){

        var currentDialog;
        var currentUser;

        changeInfoCtrl.$inject = ['$scope'];

        function changeInfoCtrl($scope){

            $scope.buttonDisabled   = false;

            $scope.avatar           = currentUser.avatar;
            $scope.username         = currentUser.username;
            $scope.email            = currentUser.email;

            $scope.changeUserInfo = function(){
                let data = {
                    username: $scope.login
                };

                $scope.buttonDisabled = true;
                PostData($scope, '/user/change-info', data, resolve);
                $scope.buttonDisabled = false;

            };

        }

        return {
           load: function(user){
               currentUser = user;
               var url = 'app/components/account/change-info/change-info.html';
               var controller = changeInfoCtrl;
               currentDialog = DialogTemplate.open(url, controller);
            }
        }
    }]);