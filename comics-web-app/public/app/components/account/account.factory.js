/**
 * Created by anastasiya on 18.11.16.
 */
comicsApp

    .factory('AccountGalleryLoader', ['GalleryLoader', 'UserRoleService', function(GalleryLoader){
        return {
            load: function ($scope) {
                let url = `/gallery/get/${$scope.currentPageId}`;
                GalleryLoader.load($scope, url);
            }
        }
    }])

    .factory('AccountInfoService', ['GetData', '$location', function(GetData, $location){

        let spareAvatar = 'https://res.cloudinary.com/dq83k7kbp/image/upload/c_scale,h_200,w_200/v1479736672/batman_04_jbnqtq.jpg';
        let returnId;

        function resolve($scope, response){
            $scope.user = {
                username : response.data.username,
                avatar : response.data.avatar || spareAvatar,
                email : response.data.email
            };

            returnId(getId());
        }

        function reject($scope, response){
            $scope.user = null;
            returnId(null);
            console.log(response);
        }

        function getId(){
            let url = $location.absUrl();
            return url.split('/').splice(-1,1);
        }


        return {
          getInfo: function($scope, callback){
               let url = '/account/get/' + getId();
               returnId = callback;
               GetData($scope, url, resolve, reject);
           }
       }
    }])

    .factory('AccountButtonsService',['ChangeInfoDialog', 'ComicsDialog', 'AccountGalleryLoader', function(ChangeInfoDialog, ComicsDialog, AccountGalleryLoader){

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
            }
        }
    }]);