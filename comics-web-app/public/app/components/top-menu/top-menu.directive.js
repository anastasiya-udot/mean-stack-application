/**
 * Created by anastasiya on 8.11.16.
 */
comicsApp.directive('topMenuBar',  function(){
    return {
        restrict: 'E',
        templateUrl: 'app/components/top-menu/top-menu.html',
        controller: ['$scope', 'AuthenticationButtons', 'SessionService' , function($scope, AuthenticationButtons, SessionService){

            SessionService.observe();

            AuthenticationButtons.listenPopDialogButtons($scope);


            $scope.getUserIdForAccount = function(){
                return SessionService.getSessionUserId();
            };

            $scope.logOutUser = function(){
                SessionService.isLogged = false;
                SessionService.destroySession();
                SessionService.observe();
            }
        }]
    }
});
