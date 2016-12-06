/**
 * Created by anastasiya on 21.11.16.
 */
comicsApp

    .factory('ChangeInfoDialog', [ 'DialogTemplate', 'PostData', 'ImageService', 'SessionService', function(DialogTemplate,PostData, ImageService,SessionService){

        let currentDialog;
        let currentUser;
        let accScope;

        changeInfoCtrl.$inject = ['$scope'];

        function changeInfoCtrl($scope){

            $scope.buttonDisabled   = false;
            $scope.currentUser      = currentUser;
            ImageService.clearInputImage($scope.previewFile);

            function canChangeInfo(){

                let prev    = $scope.previousPassword || null,
                    pass    = $scope.password || null,
                    conf    = $scope.confirmPassword || null,
                    name    = $scope.username || null;
                    email   = $scope.email || null;
                    preview = $scope.previewFile;


                let allEmptyPasswords    = (!prev && !pass && !conf),
                    allEmptyFields       =  allEmptyPasswords &&  (!name && !email && !preview),
                    anyEmptyPassword     = (!prev || !pass || !conf),
                    filledPasswords      = (!anyEmptyPassword && (conf === pass));

                return (allEmptyPasswords || filledPasswords) && !allEmptyFields;
            }

            function showPageInfoChanges($scope, response){

                response.forEach(function (elem) {

                    if (elem && elem.username) {
                        $scope.currentUser.username = elem.username;
                        accScope.user.username = elem.username;
                    }

                    if (elem && elem.avatar) {
                        $scope.currentUser.avatar = elem.avatar;
                        accScope.user.avatar = elem.avatar;
                    }

                });
            }

            function composeMessage(response){

                response.forEach(function (elem) {
                        if (elem) {
                            $scope.response += " " + elem.message;
                        }
                    });
            }


            function ClearInputFields($scope){
                $scope.previousPassword = $scope.password =
                $scope.confirmPassword  = $scope.username =
                $scope.email = null;
                ImageService.clearInputImage($scope.previewFile);
            }

            function resolve(response){
                $scope.buttonDisabled = false;
                showPageInfoChanges($scope, response);
                composeMessage(response);
                ClearInputFields($scope);
            }

            function reject(response){
                $scope.buttonDisabled = false;
                console.log(response.error);
                $scope.response += response.error + " ";
            }

            function sendAvatar(){

                if($scope.previewFile){

                    $scope.buttonDisabled = true;

                    let data = {
                        file: $scope.previewFile
                    };
                   // console.log(sizeof(data.file));

                    let url = '/account/avatar';

                    ImageService.uploadImage(data, url, function(response){
                        resolve(response)
                    });
                }
            }

            function putInnerButton(inner){
                document.getElementById('load').innerHTML = inner;
            }

            $scope.changeUserInfo = function(){

                $scope.response = '';

                if(canChangeInfo()){

                    let data = {
                        id: SessionService.getSessionUserId(),
                        username: $scope.username,
                        email: $scope.email,
                        password: $scope.password,
                        confirmPassword: $scope.confirmPassword,
                        previousPassword: $scope.previousPassword
                    };

                    $scope.buttonDisabled = true;
                    putInnerButton('Sending...');

                    PostData($scope, '/account/change-info', data,
                        function(scope, response){
                            sendAvatar();
                            resolve(response);
                            putInnerButton('Change');
                        },
                        function(scope, response){
                            sendAvatar();
                            reject(response);
                            putInnerButton('Change');
                        });

                } else {
                    $scope.response = "Check your fields";
                }

            };

            $scope.openFileDialog = ImageService.openFileDialog;

            $scope.previewImage = function(input, imageId, triggerValue){
                ImageService.previewImage(input, $scope, imageId, triggerValue);
            };

            $scope.cancelImageUpload = function(previousAvatar, imageId){
                ImageService.cancelImageUpload(previousAvatar, imageId);
                ImageService.clearInputImage($scope.previewFile);
            };

        }

        return {
            load: function(accUserScope){
                accScope = accUserScope;
                currentUser = accUserScope.user;

                let url = 'app/components/account/change-info/change-info.html';
                let controller = changeInfoCtrl;

                currentDialog = DialogTemplate.open(url, controller);
            }
        }
    }])

    .factory('ConfirmEmailChangeService', [ 'PostData', 'LoginDialog',  function(PostData, LoginDialog){

        return {
            start: function($location, $scope){

                let result = getToken($location);
                if(result){

                    let data = {
                        token: result
                    };

                    let url = '/account/confirm-email';

                    PostData($scope, url, data, resolve, reject);
                }
            }
        };

        function resolve(){
            LoginDialog.load();
        }

        function reject($scope, response){
            console.log(response.error);
            $scope.response = response.error;
        }

        function getToken($location){

            let url = $location.absUrl();

            if (url.includes('confirm-change-email')){

                let token = url.split('/').splice(-1,1);

                return data={
                    "token":  token
                };
            } else {
                return null;
            }
        }
    }]);