/**
 * Created by anastasiya on 22.11.16.
 */
comicsApp
    .directive('ngThumb', ['$window', function($window) {
        let helper = {
            support: !!($window.FileReader && $window.CanvasRenderingContext2D),
            isFile: function(item) {
                return angular.isObject(item) && item instanceof $window.File;
            },
            isImage: function(file) {
                let type =  '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        };

        function preventRedirecting(){

            $window.addEventListener("dragover",function(e){
                e = e || event;
                e.preventDefault();
            },false);

            $window.addEventListener("drop",function(e){
                e = e || event;
                e.preventDefault();
            },false);
        }

        return {
            restrict: 'A',
            template: '<canvas/>',
            link: function($scope, element, attributes) {
                preventRedirecting();

                if (!helper.support) return;

                let params = $scope.$eval(attributes.ngThumb);

                if (!helper.isFile(params.file)) return;
                if (!helper.isImage(params.file)) return;

                let canvas = element.find('canvas');
                let reader = new FileReader();

                reader.onload = onLoadFile;
                reader.readAsDataURL(params.file);

                function onLoadFile(event) {
                    console.log("onLoadFile");
                    let img = new Image();
                    img.onload = onLoadImage;
                    img.src = event.target.result;
                }

                function onLoadImage() {
                    console.log("onLoadImage");
                    let width = params.width || this.width / this.height * params.height;
                    let height = params.height || this.height / this.width * params.width;
                    canvas.attr({ width: width, height: height });
                    canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
                }
            }
        };
    }])

    .directive('fileModel', ['$parse', function($parse) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {

                let model = $parse(attrs.fileModel);
                let modelSetter = model.assign;

                element.bind('change', function(){
                    scope.$apply(function(){
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    }]);