/**
 * Created by anastasiya on 9.12.16.
 */
comicsApp

    .factory('DeleteDialog', DeleteDialogFactory);

    DeleteDialogFactory.$inject = ['DialogTemplate'];

    function DeleteDialogFactory(DialogTemplate){

        let okCallback = null;
        let dialog = null;
        let textItem = null;

        deleteDialogCtrl.$inject = ['$scope'];

        function deleteDialogCtrl($scope){

            $scope.item = textItem;

            $scope.confirm = function(){
                okCallback();
                DialogTemplate.close(dialog);
            };
            $scope.cancel = function(){
                DialogTemplate.close(dialog);
            }
        }

        return {
            open: function(okFunc, item){

                let url = 'app/components/delete-dialog/delete-dialog.html';
                let controller =  deleteDialogCtrl;
                okCallback =  okFunc;
                textItem = item;

                dialog = DialogTemplate.open(url, controller);
            }
        }
    }