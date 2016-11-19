/**
 * Created by anastasiya on 13.11.16.
 */
comicsApp
    .factory( 'GalleryLoader', ['GetData', function(GetData){


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


    function resolve($scope, response){
        initGroup(response, $scope.comics);
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
}])
    .factory('Sorter', [function(){

        function initOrder($scope){
            $scope.OrderBy = function(by){
                $scope.orderComics  = by;
            };
        }

        return {
            initialize: function($scope){
                $scope.comics = [];
                $scope.pageSize = 5;
                $scope.currentPage = 1;
                initOrder($scope);
            }
        }
    }]);
