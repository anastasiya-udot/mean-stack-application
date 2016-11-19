/**
 * Created by anastasiya on 18.11.16.
 */
comicsApp
    .controller('browseAccountCtrl', [ '$scope', 'TokenParser', 'UserPageService', function($scope, TokenParser, UserPageService){
       var user = TokenParser.currentUser();
        UserPageService.load($scope, user.id);
    }]);