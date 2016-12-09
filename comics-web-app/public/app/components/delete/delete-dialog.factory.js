/**
 * Created by anastasiya on 9.12.16.
 */
comicsApp

    .factory('DeleteDialog', DeleteDialogFactory);

    DeleteDialogFactory.$inject = ['DialogTemplate', 'DeleteData'];

    function DeleteDialogFactory(DialogTemplate, DeleteData){

        let resolveFunc = null,
            rejectFunc = null,
            sendData = null,
            sendUrl = null,
            dialog = null,
            textItem = null;

        function setButtonDisable(buttonDisabledTrigger, value){

            buttonDisabledTrigger = value;
            if(value){
                putInnerButton("Deleting...")
            } else {
                putInnerButton("Delete")
            }
        }

        function putInnerButton(inner){
            if( document.getElementById('load'))
                document.getElementById('load').innerHTML = inner;
        }


        deleteDialogCtrl.$inject = ['$scope'];

        function deleteDialogCtrl($scope){

            $scope.item = textItem;
            $scope.beforeSending = true;

            $scope.confirm = function(){

                setButtonDisable($scope.buttonDisabled, true);

                DeleteData(sendUrl, sendData, function(response){
                    $scope.beforeSending = false;
                    $scope.successResult = true;
                    $scope.response = response.message;
                    resolveFunc(response);
                }, function(response){
                    $scope.beforeSending = false;
                    $scope.successResult = false;
                    $scope.response = response.error;
                    rejectFunc(response);
                })

            };

            $scope.cancel = function(){
                DialogTemplate.close(dialog);
            }
        }

        return {
            open: function(Url, data, resolve, reject, item){

                sendUrl = Url;
                textItem = item;
                sendData = data;
                resolveFunc = resolve;
                rejectFunc = reject;

                let url = 'app/components/delete/delete-dialog.html';
                let controller =  deleteDialogCtrl;

                dialog = DialogTemplate.open(url, controller);
            }
        }
    }