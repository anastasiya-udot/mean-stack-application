/**
 * Created by anastasiya on 9.12.16.
 */
comicsApp
    .controller('comicsPageCtrl', comicsPageCtrl);

    function getToken($location){
        let url = $location.absUrl();
        let token = url.split('/').splice(-1,1);
        return data={
            "token":  token
        };
    }

    comicsPageCtrl.$inject = ['$scope' , '$location', 'ComicsPageLoader'];

    function comicsPageCtrl($scope, $location,  ComicsPageLoader){
        ComicsPageLoader.start($scope, getToken($location).token);
    }