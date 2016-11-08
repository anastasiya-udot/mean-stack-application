/**
 * Created by anastasiya on 8.11.16.
 */
comicsApp.controller('initialPageCtrl', initialPageCtrl);

initialPageCtrl.$inject = [ '$scope', 'InitialPageSlider'];

function initialPageCtrl($scope, InitialPageSlider) {
    InitialPageSlider.set($scope)
}
