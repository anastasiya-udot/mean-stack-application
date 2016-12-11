/**
 * Created by anastasiya on 18.11.16.
 */
comicsApp

    .factory('AccountGalleryLoader', ['GalleryLoader', 'SessionService', function(GalleryLoader, SessionService){
        return {
            load: function ($scope) {
                let url = `/gallery/get/${SessionService.getCurrentPageId()}`;
                GalleryLoader.load($scope, url);
            }
        }
    }])

    .factory('AccountInfoService', ['GetData', 'SessionService', function(GetData, SessionService){

        let spareAvatar = '../../../assets/images/batman_04_jbnqtq.jpg';
        let returnId;

        function resolve($scope, response){

            $scope.user = {
                username : response.data.username,
                avatar : response.data.avatar || spareAvatar,
                email : response.data.email
            };

            returnId(SessionService.getCurrentPageId());
        }

        function reject($scope, response){
            $scope.user = null;
            returnId(null);
            console.log(response);
        }


        return {
          getInfo: function($scope, callback){
               let url = '/account/get/' + SessionService.getCurrentPageId();
               returnId = callback;
               GetData($scope, url, resolve, reject);
           }
       }
    }])

    .factory('AccountButtonsService',['ChangeInfoDialog',
        'ComicsDialog', 'DeleteDialog', 'AccountGalleryLoader', 'SessionService',
        function(ChangeInfoDialog, ComicsDialog, DeleteDialog, AccountGalleryLoader, SessionService){

        return {
             start: function($scope){
                 ListenChangeInfoButton($scope)
             }
        };

        function ListenChangeInfoButton($scope){

            $scope.changeUserInfo = function(){
                ChangeInfoDialog.load($scope);
            };

            $scope.createNewComics = function(){
                ComicsDialog.openNewComicsDlg($scope);
            };

            $scope.editComics = function(elem){
                ComicsDialog.openEditComicsDlg(elem);
            };

            $scope.openUserGallery = function(){
                $scope.showGallery = !$scope.showGallery;
                if($scope.showGallery){
                    $scope.comics = [];
                    AccountGalleryLoader.load($scope);
                }
            };

            $scope.deleteComics = function(elem){

                function resolve(res){
                    if ($scope.comics) {

                        let index = $scope.comics.indexOf(elem);

                        if (index > -1) {
                            $scope.comics.splice(index, 1);
                        }
                    }
                }

                function reject(res){
                    console.log(res.error);
                }

                let url = '/comics/delete';

                let data = {
                    comicsId: elem.comicsId,
                    userId: SessionService.getSessionUserId()
                };

                DeleteDialog.open(url, data, resolve, reject, "comics");
            }
        }
    }]);