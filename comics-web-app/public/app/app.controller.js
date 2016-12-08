/**
 * Created by anastasiya on 8.11.16.
 */
comicsApp
    .controller('initialPageCtrl', initialPageCtrl);

initialPageCtrl.$inject = [ '$scope', 'SessionService', 'InitialPageLoader'];

function initialPageCtrl($scope, SessionService, InitialPageLoader) {
    // SessionService.observe: check is user logged in and change page content according to it
    SessionService.observe();

    $scope.userId = SessionService.getSessionUserId();

    InitialPageLoader.load($scope)
}
