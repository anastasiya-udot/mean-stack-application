/**
 * Created by anastasiya on 11.12.16.
 */
comicsApp
    .controller('pageCtrl', pageCtrl)
    .controller('createPageCtrl', createPageCtrl);

    pageCtrl.$inject = ['$scope', 'PageLoader'];

    function pageCtrl($scope, PageLoader){
        PageLoader.start($scope);
    }

    createPageCtrl.$inject = ['$scope', 'PageLoader'];

    function createPageCtrl($scope, PageLoader){
        PageLoader.startNew($scope);
    }