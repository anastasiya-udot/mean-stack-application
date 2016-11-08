/**
 * Created by anastasiya on 8.11.16.
 */
comicsApp.directive('topMenuBar',  function(){
    return {
        restrict: 'E',
        scope: false,
        templateUrl: 'app/components/top-menu/top-menu.html',
        controller: ['$scope', 'AuthenticationButtons', function($scope, AuthenticationButtons){
            AuthenticationButtons.listenPopDialogButtons($scope);
        }]
    }
});
