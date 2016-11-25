/**
 * Created by anastasiya on 21.11.16.
 */
comicsApp

    .factory('ImageUploader',[function() {


        return {

            isImage: function(file) {
                let type =  '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|'.indexOf(type) !== -1;
            },
            readURL : function(file, $scope) {

                    let reader = new FileReader();

                    reader.onload = function (e) {
                        $scope.chosenFile = e.target.result;
                        document.getElementById('currentAvatar').setAttribute('src',e.target.result);
                    };

                    reader.readAsDataURL(file);
            }
        }
    }])

    .factory('ChangeInfoDialog', [ 'DialogTemplate', 'PostData', 'ImageUploader', 'SessionService', function(DialogTemplate,PostData, ImageUploader,SessionService){

        let currentDialog;
        let currentUser;

        changeInfoCtrl.$inject = ['$scope'];

        function changeInfoCtrl($scope){

            $scope.buttonDisabled   = false;
            $scope.currentUser      = currentUser;
            $scope.chosenFile       = null;


            function canChangeInfo(){
                let prev    = $scope.previousPassword || null,
                    pass    = $scope.password || null,
                    conf    = $scope.confirmPassword || null,
                    name    = $scope.username || null;
                    email   = $scope.email || null;

                let allEmptyPasswords    = (!prev && !pass && !conf),
                    allEmptyFields       =  allEmptyPasswords &&  (!name && !email),
                    anyEmptyPassword     = (!prev || !pass || !conf),
                    filledPasswords      = (!anyEmptyPassword && (conf === pass));
                
                return (allEmptyPasswords || filledPasswords) && !allEmptyFields;
            }

            function resolve($scope, response){
                console.log(response);
            }

            $scope.changeUserInfo = function(){

                if(!canChangeInfo()){
                    $scope.response = "Data wasn't changed";
                    return;
                }

                let data = {
                    id: SessionService.getSessionUserId(),
                    avatar: $scope.chosenFile,
                    username: $scope.username,
                    email: $scope.email,
                    previousPassword : $scope.previousPassword,
                    password: $scope.password,
                    confirmPassword: $scope.confirmPassword
                };

                $scope.buttonDisabled = true;
                PostData($scope, '/user/change-info', data, resolve);
                $scope.buttonDisabled = false;

            };

            $scope.openFileDialog = function(){
                document.getElementById('inputAvatar').click();
            };


            $scope.previewImage = function(input){
                if (input.files && input.files[0]) {

                    if (ImageUploader.isImage(input.files[0])){
                        ImageUploader.readURL(input.files[0], $scope);
                    }
                }

            };

            $scope.cancelImageUpload = function(previousAvatar){
                $scope.chosenFile = null;
                document.getElementById('currentAvatar').setAttribute('src', previousAvatar);

            }

        }

        return {
            load: function(user){
                currentUser = user;
                let url = 'app/components/account/change-info/change-info.html';
                let controller = changeInfoCtrl;
                currentDialog = DialogTemplate.open(url, controller);
            }
        }
    }]);