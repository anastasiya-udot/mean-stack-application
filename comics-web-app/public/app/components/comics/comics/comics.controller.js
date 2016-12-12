/**
 * Created by anastasiya on 9.12.16.
 */
comicsApp
    .controller('comicsCtrl', comicsCtrl);

    function getToken($location){
        let url = $location.absUrl();
        let token = url.split('/').splice(-1,1);
        return data={
            "token":  token
        };
    }

    comicsCtrl.$inject = ['$scope' , '$location', 'ComicsLoader'];

    function comicsCtrl($scope, $location, ComicsLoader){
        ComicsLoader.start($scope, getToken($location).token);
    }