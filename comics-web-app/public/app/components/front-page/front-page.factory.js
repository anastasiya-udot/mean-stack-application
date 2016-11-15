/**
 * Created by anastasiya on 9.11.16.
 */
comicsApp.factory('InitialPageContent',['AuthenticationButtons', function(AuthenticationButtons){
    return{
        set : function($scope){
            AuthenticationButtons.listenPopDialogButtons($scope);
        }
    }
}]);