/**
 * Created by anastasiya on 8.11.16.
 */
comicsApp
    .controller('initialPageCtrl', initialPageCtrl)

initialPageCtrl.$inject = [ '$scope', 'InitialPageContent'];

function initialPageCtrl($scope, InitialPageContent) {
    InitialPageContent.set($scope)
}
