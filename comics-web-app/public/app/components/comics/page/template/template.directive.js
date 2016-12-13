/**
 * Created by anastasiya on 12.12.16.
 */
comicsApp
    .directive('templateFirstComicsPage', function(){

        return {
            restrict: 'E',
            templateUrl: 'app/components/comics/page/template/template1.html',
            controller: templateCtrl
        }

    })

    .directive('templateSecondComicsPage', function(){

        return {
            restrict: 'E',
            templateUrl: 'app/components/comics/page/template/template2.html',
            controller: templateCtrl
        }

    });

    function clearTextBoxes(page){
        for (let counter = 1; counter <= 3; counter++){
            page[`pageText${counter}`] = null;
        }
    }


    templateCtrl.$inject = ['$scope', 'PageFormFactory', 'ImageService'];


    function templateCtrl($scope, PageFormFactory, ImageService){

        $scope.page = {};

        ImageService.clearInputImage($scope.previewFile1);
        ImageService.clearInputImage($scope.previewFile2);
        ImageService.clearInputImage($scope.previewFile3);

        $scope.image1 = '/assets/images/5256594-blur-wallpaper.jpg';
        $scope.image2 = '/assets/images/turquoise-blur-29626-1920x1080.jpg';
        $scope.image3 = '/assets/images/WDF_778700.jpg';

        $scope.openFileDialog = ImageService.openFileDialog;

        $scope.openTextCloud = function(value){
            $scope[value] = true;
        };

        $scope.closeTextCloud = function(value){
            $scope[value] = false;
        };

        $scope.previewImage = function(input, imageId, triggerValue){
            ImageService.previewImage(input, $scope, imageId, triggerValue);
            console.log($scope);
        };

        $scope.cancelImageUpload = function(previousImage, imageId, previewFile){
            ImageService.cancelImageUpload(previousImage, imageId);
            ImageService.clearInputImage($scope[previewFile]);
        };

        PageFormFactory.start($scope);
    }