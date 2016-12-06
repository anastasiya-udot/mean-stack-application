/**
 * Created by anastasiya on 13.11.16.
 */
comicsApp.
    controller('browseGalleryCtrl', [ '$scope', 'GalleryLoader', 'Sorter', function($scope, GalleryLoader, Sorter){
        let url = '/gallery/get';
        GalleryLoader.load($scope, url);
        Sorter.initialize($scope);
}]);