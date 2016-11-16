/**
 * Created by anastasiya on 13.11.16.
 */
comicsApp.factory( 'GalleryLoader', ['GetData', function(GetData){


    function getFullDate(elem){
        var date = new Date(elem.date);
        return date.getDate() + "." +
            date.getMonth() + "." +
            date.getFullYear() + " " +
            date.getHours() + ":" +
            date.getMinutes();
    }

    function initGroup(response, comics){
        response.data.forEach(function(elem){
            var comicsData = {};
            comicsData.comicsName= elem.name;
            comicsData.comicsAuthor = elem.author;
            comicsData.comicsDate = getFullDate(elem);
            comicsData.comicsImagePath= elem.picture || '/assets/images/WDF_778700.jpg';
            comics.push(comicsData);
        });
    }

    function initOrders($scope){
        $scope.OrderBy = function(by){
            $scope.orderComics  = by;
            console.log($scope.orderComics);
        };
    }

    function resolve($scope, response){
        scope = $scope;
        $scope.comics = [];
        $scope.pageSize = 5;
        $scope.currentPage = 1;
        initGroup(response, $scope.comics);
        initOrders($scope)
    }

    function reject($scope, response){
        console.log("err "+ response)
    }

    return {
        load: function($scope){
            var url = '/gallery/get';
            GetData($scope, url, resolve, reject);
        }
    }
}]);