/**
 * Created by anastasiya on 13.11.16.
 */


comicsApp
    .controller('resetPasswordPageCtrl', resetPasswordPageCtrl);

resetPasswordPageCtrl.$inject = [ '$scope', '$location', 'InitialPageLoader', 'ResetPassDialog', 'PostData'];

function getToken($location){
    let url = $location.absUrl();
    let token = url.split('/').splice(-1,1);
    return data={
        "token":  token
    };
}


function resetPasswordPageCtrl($scope, $location, InitialPageLoader, ResetPassDialog, PostData) {

    function resolve($scope, res){
        if(angular.isDefined(res.email)){
            ResetPassDialog.load(res.email);
        }
    }

    function reject($scope, response){
        $scope.response = response.error;
    }

    InitialPageLoader.load($scope);

    let data = getToken($location);
    PostData($scope, '/user/reset-password', data, resolve, reject);
}