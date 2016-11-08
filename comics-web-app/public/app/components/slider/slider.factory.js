/**
 * Created by anastasiya on 9.11.16.
 */
comicsApp.factory('InitialPageSlider',['AuthenticationButtons', function(AuthenticationButtons){
    return{
        set : function($scope){
            AuthenticationButtons.listenPopDialogButtons($scope);
        }
    }
}]);