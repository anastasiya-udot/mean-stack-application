/**
 * Created by anastasiya on 11.12.16.
 */
comicsApp

    .factory('PageLoader', pageLoader);

    pageLoader.$inject = ['SessionService', 'PageFormFactory', '$q'];

    function pageLoader(SessionService, PageFormFactory, $q){

        function ActivateButtons($scope){

            $scope.firstTemplateOpen = function(){
                $scope.firstTemplate = true;
                $scope.secondTemplate = false;
                PageFormFactory.addParts(1);
            };

            $scope.secondTemplateOpen = function(){
                $scope.firstTemplate = false;
                $scope.secondTemplate = true;
                PageFormFactory.addParts(2);
            };

            $scope.savePage = function(){
                $scope.beforeSending = false;
                $scope.response = "Sending...";

                let promise = asyncSave();

                promise.then(function(message){
                    $scope.response = message;
                });
            }
        }

        function asyncSave(){
            let deferred = $q.defer();

            PageFormFactory.sendPage(function(response){
                resolve(response);
            });

            return deferred.promise;

        }

        return {
            startNew: function($scope){

                SessionService.checkPermission(SessionService.getCurrentPageId());
                $scope.beforeSending = true;
                ActivateButtons($scope);
            }
        }

    }