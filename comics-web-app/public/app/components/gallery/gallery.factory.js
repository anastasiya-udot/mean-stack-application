/**
 * Created by anastasiya on 13.11.16.
 */
comicsApp
    .factory( 'GalleryLoader', ['GetData', function(GetData){


    function getFullDate(elem){
       let date = new Date(elem.comicsDate);
        return date.getDate() + "." +
            date.getMonth() + "." +
            date.getFullYear() + " " +
            date.getHours() + ":" +
            date.getMinutes();
    }

    function initGroup(response, comics){

        response.data.forEach(function(elem){
            let comicsData = {};
            comicsData.comicsName = elem.comicsName;
            comicsData.authorName = elem.authorName;
            comicsData.authorId = elem.authorId;
            comicsData.comicsDate = getFullDate(elem);
            comicsData.comicsDescription =  elem.comicsDescription
            comicsData.comicsId = elem.comicsId;
            comicsData.comicsCover = elem.comicsCover || '/assets/images/WDF_778700.jpg';
            comics.push(comicsData);
        });
    }


    function resolve($scope, response){
        console.log(response);
        initGroup(response, $scope.comics);
    }

    function reject($scope, response){
        console.log("err "+ response)
    }

    return {
        load: function($scope, url){
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
