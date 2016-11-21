/**
 * Created by anastasiya on 9.11.16.
 */
comicsApp.factory('InitialPageLoader',['AuthenticationButtons', function(AuthenticationButtons){
    return{
        load : function($scope){
            AuthenticationButtons.listenPopDialogButtons($scope);
        }
    }
}]);