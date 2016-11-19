/**
 * Created by anastasiya on 8.11.16.
 */
comicsApp
    .controller('initialPageCtrl', initialPageCtrl);

initialPageCtrl.$inject = [ '$scope', 'SessionService', 'InitialPageContent'];

function initialPageCtrl($scope, SessionService, InitialPageContent) {
    SessionService.observe();
    InitialPageContent.set($scope)
}
