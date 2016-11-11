/**
 * Created by anastasiya on 8.11.16.
 */
comicsApp
    .controller('initialPageCtrl', initialPageCtrl)
    .controller('resetPasswordPageCtrl', resetPasswordPageCtrl);

initialPageCtrl.$inject = [ '$scope', 'InitialPageContent'];

function initialPageCtrl($scope, InitialPageContent) {
    InitialPageContent.set($scope)
}

resetPasswordPageCtrl.$inject = [ '$scope', '$location', 'InitialPageContent', 'ResetPassDialog', 'SendData'];


function resetPasswordPageCtrl($scope, $location, InitialPageContent, ResetPassDialog, SendData) {

    function resolve($scope, res){
        if(angular.isDefined(res.email)){
            ResetPassDialog.load(res.email);
        }
    }

    InitialPageContent.set($scope);
    var url = $location.absUrl();
    var tokenRecovery = url.split('/').splice(-1,1);
    var data={
        "token":  tokenRecovery
    };
    SendData($scope, '/reset', data, resolve);
}