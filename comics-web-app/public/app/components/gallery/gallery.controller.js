/**
 * Created by anastasiya on 13.11.16.
 */
comicsApp.
    controller('browseGalleryCtrl', [ '$scope', 'GalleryLoader', function($scope, GalleryLoader){

    GalleryLoader.load($scope);

}]);