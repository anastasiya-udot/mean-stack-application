/**
 * Created by anastasiya on 18.11.16.
 */
comicsApp
    .controller('browseAccountCtrl', browseAccountCtrl);

    browseAccountCtrl.$inject =[ '$scope', '$q', 'AccountInfoService', 'UserRoleService', 'AccountButtonsService'];

    function browseAccountCtrl($scope, $q, AccountInfoService, UserRoleService, AccountButtonsService){

        function checkIsUserFound(id){

            if(!id){
               $scope.isUserFound = false;
            }
            return $scope.isUserFound;
        }

        let asyncGetInfo = function(){

            let defered = $q.defer();

            AccountInfoService.getInfo($scope, function(currentUserId){
                defered.resolve(currentUserId);
            });

            return defered.promise;
        };

        $scope.isUserFound = true;

        asyncGetInfo().then(
            function(response){
                if(checkIsUserFound(response)){
                    $scope.role = UserRoleService.getRole(response);
                    AccountButtonsService.start($scope);
                }

            }
        );
    }
