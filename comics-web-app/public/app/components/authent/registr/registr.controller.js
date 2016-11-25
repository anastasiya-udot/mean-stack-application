/**
 * Created by anastasiya on 13.11.16.
 */

comicsApp
    .controller('confirmRegistrPageCtrl', confirmRegistrPageCtrl);

confirmRegistrPageCtrl.$inject = [ '$scope', '$location', 'InitialPageLoader', 'LoginDialog', 'PostData'];

function getToken($location){
    let url = $location.absUrl();
    let token = url.split('/').splice(-1,1);
    return data={
        "token":  token
    };
}

function confirmRegistrPageCtrl($scope, $location, InitialPageLoader, LoginDialog, PostData){

    function resolve(){
        LoginDialog.load();
    }

    InitialPageLoader.load($scope);
    let data = getToken($location);
    console.log(data);
    PostData($scope, '/user/confirm-registr', data, resolve);
}
