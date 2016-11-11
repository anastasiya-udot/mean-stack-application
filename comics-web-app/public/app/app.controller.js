/**
 * Created by anastasiya on 8.11.16.
 */
comicsApp
    .controller('initialPageCtrl', initialPageCtrl)
    .controller('resetPassword', resetPasswordCtrl);

initialPageCtrl.$inject = [ '$scope', 'InitialPageSlider'];

function initialPageCtrl($scope, InitialPageSlider) {
    InitialPageSlider.set($scope)
}

initialPageCtrl.$inject = [ '$scope', 'InitialPageSlider'];

function resetPasswordCtrl() {

}