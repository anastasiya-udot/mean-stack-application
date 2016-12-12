/**
 * Created by anastasiya on 11.12.16.
 */
comicsApp
    .factory('PageLoader', pageLoader);

    pageLoader.$inject = ['SessionService'/*'GetData'*/];

    function pageLoader(SessionService/*GetData*/){

        function ActivateButtons($scope){

            $scope.firstTemplateOpen = function(){
                $scope.firstTemplate = true;
                $scope.secondTemplate = false;
            };

            $scope.secondTemplateOpen = function(){
                $scope.firstTemplate = false;
                $scope.secondTemplate = true;
            };
        }

        return {
            startNew: function($scope){
                SessionService.checkPermission(SessionService.getCurrentPageId());
                ActivateButtons($scope);
            }
        }

    }