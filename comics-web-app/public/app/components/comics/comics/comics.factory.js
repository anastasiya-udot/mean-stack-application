/**
 * Created by anastasiya on 9.12.16.
 */
comicsApp
    .factory('ComicsLoader', comicsPageFactory);

    comicsPageFactory.$inject = ['GetData','SessionService', 'ComicsDialog', 'DeleteDialog', '$location'];

    function comicsPageFactory(GetData, SessionService, ComicsDialog, DeleteDialog, $location){

        function showContent($scope, response){

            $scope.comicsId = response.comics.comicsId;
            $scope.comicsCover = response.comics.comicsCover;
            $scope.comicsName = response.comics.comicsName;
            $scope.authorName = response.comics.authorName;
            $scope.authorId = response.comics.authorId;

            if (response.comics.comicsDescription){
                $scope.comicsDescription = response.comics.comicsDescription;
                $scope.haveDescr = true;
            } else {
                $scope.comicsDescription = '';
                $scope.haveDescr = false;
            }

        }

        function resolve($scope, response){
            SessionService.checkPermission(response.comics.authorId);
            showContent($scope, response);
        }

        function reject($scope, response){
            console.log(response.error);
            $scope.notAvailablle = true;
        }


        function ActivateButtons($scope){
            $scope.editComics = function(){
                ComicsDialog.openEditComicsDlg($scope);
            };


            $scope.deleteComics = function(){

                function resolve(res){
                    $location.path(`/account/${SessionService.getSessionUserId()}`);
                }

                function reject(res){
                    console.log(res.error);
                }

                let url = '/comics/delete';

                let data = {
                    comicsId: $scope.comicsId,
                    userId: SessionService.getSessionUserId()
                };

                DeleteDialog.open(url, data, resolve, reject, "comics");
            };
        }


       return {

           start: function($scope, id){

               let url = `/comics/get/${id}`;
               GetData($scope, url, resolve, reject);

               ActivateButtons($scope);
           }

       }

    }