/**
 * Created by anastasiya on 8.11.16.
 */
comicsApp
    .factory('DialogTemplate', [ 'ngDialog', function(ngDialog) {
    return {
        open: function (url, controller) {
            return ngDialog.open({
                template: url,
                controller: controller,
                closeByEscape: true
            });
        },

        close: function(dialog){
            ngDialog.close(dialog);
        }
    }
}])

    .factory('PostData', ['$http', function($http){
    return function($scope, url, data, resolve, reject){
        const config = {
            headers : {
                'Content-Type': 'application/json;charset=utf-8;'
            }
        };

        $http.post( url, data, config)
            .success(function (data) {
                if( angular.isDefined(data.error)){
                    reject($scope, data);
                } else {
                    resolve($scope, data);
                }
            })
    };

}])

    .factory('GetData', ['$http', function($http){
        return function($scope, url, resolve, reject){
            const config = {
                headers : {
                    'Content-Type': 'application/json;charset=utf-8;'
                }
            };

            $http.get( url, config)
                .then(
                    (response) => { resolve($scope, response)},
                    (response) => { reject($scope, response)}
                )
        };

    }])

    .factory('SessionService',[ '$window', '$rootScope', '$location', function($window, $rootScope, $location){

        return {

            isLogged: false,

            observe: function(){
                $rootScope.loggedIn = false;
                if ($window.sessionStorage.token){
                    $rootScope.loggedIn = true;
                }
            },

            startSession: function(token){
                $window.sessionStorage.token = token;
            },

            destroySession: function(){
                delete $window.sessionStorage.token;
                $location.path('/');
            },

            getSessionUserId : function(){
                let token =  $window.sessionStorage.token;

                if(token){
                    let payload = token.split('.')[1];

                    payload = $window.atob(payload);
                    payload = JSON.parse(payload);
                    return payload.id;
                }
                return null;
            }
        }

    }])

    .factory('ImageService',[ 'Upload', 'SessionService', function(Upload, SessionService) {

        function isImage (file) {
            let type =  '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|'.indexOf(type) !== -1;
        }

        function readURL(file, $scope, imageID, triggerValue) {

            let reader = new FileReader();

            reader.onload = function (e) {
                $scope[triggerValue] = e.target.result;
                document.getElementById(imageID).setAttribute('src',e.target.result);
            };

            reader.readAsDataURL(file);
        }


        return {

            clearInputImage: function(preview){
                preview = null;
            },

            openFileDialog : function(inputId){
                document.getElementById(inputId).click();
            },

            previewImage: function(input, $scope, imageID, triggerValue){
                if (input.files && input.files[0]) {

                    if (isImage(input.files[0])){
                        readURL(input.files[0], $scope, imageID, triggerValue);
                    }
                }
            },

            cancelImageUpload: function(previousAvatar, imageId){
                document.getElementById(imageId).setAttribute('src', previousAvatar);
            },

            uploadImage: function(data, url, callback){

                data.id = SessionService.getSessionUserId();

                let upload = Upload.upload({
                    url: url,
                    method: 'POST',
                    data: data
                });

                upload.then(function(response){
                    callback(response.data)
                })
            }
        }
    }]);
