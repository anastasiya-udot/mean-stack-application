/**
 * Created by anastasiya on 13.11.16.
 */

comicsApp
    .controller('confirmRegistrPageCtrl', confirmRegistrPageCtrl);

confirmRegistrPageCtrl.$inject = [ '$scope', '$location', 'InitialPageContent', 'LoginDialog', 'PostData'];

function getToken($location){
    var url = $location.absUrl();
    var token = url.split('/').splice(-1,1);
    return data={
        "token":  token
    };
}

function confirmRegistrPageCtrl($scope, $location, InitialPageContent, LoginDialog, PostData){

    function resolve($scope, res){
        LoginDialog.load();
    }

    InitialPageContent.set($scope);
    var data = getToken($location);
    PostData($scope, '/user/confirm-registr', data, resolve);
}
