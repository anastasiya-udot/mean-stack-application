/**
 * Created by anastasiya on 13.11.16.
 */
comicsApp.
    controller('browseGalleryCtrl', [ '$scope', 'GalleryLoader', 'Sorter', function($scope, GalleryLoader, Sorter){
        GalleryLoader.load($scope);
        Sorter.initialize($scope);
}]);