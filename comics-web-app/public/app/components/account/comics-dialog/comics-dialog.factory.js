/**
 * Created by anastasiya on 29.11.16.
 */
comicsApp
    .factory('ComicsDialog', comicsDialogFactory);

    comicsDialogFactory.$inject = ['DialogTemplate'];

    function comicsDialogFactory(DialogTemplate, ImageService){

        let parentScope = null;
        let currentComics = null;

        comicsDialogCtrl.$inject = ['$scope', 'PostData', 'ImageService', 'SessionService'];

        function comicsDialogCtrl($scope, PostData, ImageService, SessionService){

            ImageService.clearInputImage($scope.previewFile);

            function setFieldsValue(){

                $scope.placeholderName = 'Enter new comics name';
                $scope.placeholderDescription = 'This comics is about...';
                if(currentComics){
                    $scope.coverSrc = currentComics.cover;
                    $scope.comicsName = currentComics.name;
                    $scope.comicsDescription = currentComics.description;
                } else {
                    $scope.coverSrc = 'assets/images/9-512.png';
                }
                checkInputDescription();
            }


            function setButtonDisable(value){
                $scope.buttonDisabled = value;
                if(value){
                    putInnerButton("Creating...")
                } else {
                    putInnerButton("Create")
                }
            }

            function putInnerButton(inner){
                document.getElementById('load').innerHTML = inner;
            }


            function resolve($scope, response){

                response.message.forEach(function (elem) {
                    if (elem) {
                        $scope.response += " " + elem.message;
                    }
                });


                if(currentComics){
                    if(response.data.comicsName)
                        parentScope.comicsName = response.data.comicsName;
                    if(response.data.comicsDescription)
                        parentScope.comicsDescription = response.data.comicsDescription;
                    if(response.data.comicsCover)
                        parentScope.comicsCover = response.data.comicsCover;
                }

            }

            function reject($scope, response){

                response.error.forEach(function (elem) {
                    if (elem) {
                        $scope.response += " " + elem.message;
                    }
                });
            }

            function clearInput(){
                $scope.comicsDescription = $scope.previewFile = $scope.comicsName = '';
            }

            function sendCover(response){

                if($scope.previewFile){

                    let data = {
                        file: $scope.previewFile,
                        comics_id: response.data.comicsId,
                    };

                    let url = '/comics/cover';

                    ImageService.uploadImage(data, url, function(response){

                        if(response.error){
                            reject($scope, response);
                        } else {
                            resolve($scope, response);
                        }

                        setButtonDisable(false);
                        clearInput();

                    });
                } else {
                    clearInput();
                    setButtonDisable(false);
                }
            }

            function checkInputDescription(){

                if(!$scope.comicsDescription) $scope.comicsDescription = '';

                if($scope.comicsDescription.length <= 200){
                    $scope.symbolsLeft = `${200 - $scope.comicsDescription.length} characters left`;
                } else {
                    $scope.symbolsLeft = "Characters limit is exceeded";
                }

            }

            function canChangeInfo(){

                let image   = $scope.previewImage;
                let name    = $scope.comicsName;
                let descr   = $scope.comicsDescription;

                if (currentComics){
                    return image || name || descr;
                } else {
                    return name;
                }
            }

            function getComicsDescription(){
                let length;
                ($scope.comicsDescription.length - 1 > 200) ? length = 200 : length = $scope.comicsDescription.length - 1;
                return $scope.comicsDescription.substr(0, length);
            }

            $scope.openFileDialog = ImageService.openFileDialog;

            $scope.checkInputDescription = checkInputDescription;

            $scope.previewImage = function(input, imageId, triggerValue){
                ImageService.previewImage(input, $scope, imageId, triggerValue);
            };

            $scope.cancelImageUpload = function(previousCover, imageId){
                ImageService.cancelImageUpload(previousCover, imageId);
                ImageService.clearInputImage($scope.previewFile);
            };

            $scope.sendComicsData = function(){

                if(!canChangeInfo()){
                    $scope.response = "Check your fields.";
                    return;
                }

                $scope.response = '';

                setButtonDisable(true);

                let comicsDescription = getComicsDescription();

                let data = {
                    id: SessionService.getSessionUserId(),
                    name: $scope.comicsName,
                    description: comicsDescription
                };

                let url='';

                if(currentComics){
                     url = `/comics/edit-comics/${currentComics.id}`;
                } else {
                     url = '/comics/create-comics';
                }

                PostData($scope, url, data, function($scope, data){

                    if(data.message)
                        resolve($scope, data);
                    sendCover(data);

                }, reject);
            };


            setFieldsValue();
            ImageService.clearInputImage($scope.previewFile);

        }

        function initDialog(){
            let url = 'app/components/account/comics-dialog/comics-dialog.html';
            let controller =  comicsDialogCtrl;

            DialogTemplate.open(url, controller);
        }

        return {

            openNewComicsDlg: function(accScope){
                currentComics = null;
                parentScope = accScope;
                initDialog();
            },

            openEditComicsDlg: function(accScope){
              //  .comicsId, elem.comicsName, elem.comicsDescription, elem.comicsCover
                currentComics = {
                    id: accScope.comicsId,
                    name: accScope.comicsName,
                    description: accScope.comicsDescription,
                    cover: accScope.comicsCover
                };

                parentScope = accScope;
                initDialog();
            }

        }
    }