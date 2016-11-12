/**
 * Created by anastasiya on 8.11.16.
 */
comicsApp
    .controller('initialPageCtrl', initialPageCtrl)
    .controller('resetPasswordPageCtrl', resetPasswordPageCtrl)
    .controller('confirmRegistrPageCtrl', confirmRegistrPageCtrl);


function getToken($location){
    var url = $location.absUrl();
    var token = url.split('/').splice(-1,1);
    return data={
        "token":  token
    };
}



initialPageCtrl.$inject = [ '$scope', 'InitialPageContent'];

function initialPageCtrl($scope, InitialPageContent) {
    InitialPageContent.set($scope)
}

resetPasswordPageCtrl.$inject = [ '$scope', '$location', 'InitialPageContent', 'ResetPassDialog', 'SendData'];

function resetPasswordPageCtrl($scope, $location, InitialPageContent, ResetPassDialog, SendData) {

    function resolve($scope, res){
        if(angular.isDefined(res.email)){
            console.log("reset");
            ResetPassDialog.load(res.email);
        }
    }

    InitialPageContent.set($scope);
    var data = getToken($location);
    SendData($scope, '/user/reset-password', data, resolve);
}

confirmRegistrPageCtrl.$inject = [ '$scope', '$location', 'InitialPageContent', 'LoginDialog', 'SendData'];

function confirmRegistrPageCtrl($scope, $location, InitialPageContent, LoginDialog, SendData){

    function resolve($scope, res){
        LoginDialog.load();
    }

    InitialPageContent.set($scope);
    var data = getToken($location);
    SendData($scope, '/user/confirm-registr', data, resolve);
}
