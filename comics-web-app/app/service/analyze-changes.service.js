/**
 * Created by anastasiya on 25.11.16.
 */
var editUserService      = require('./edit-user-data.service.js');

module.exports.initializeQueue = function(data, user){
    return [
        analyzeAvatarChange,
        analyzeUserNameChange,
        analyzeUserEmailChange
    ];

    function analyzeAvatarChange(callback){
        if (data.avatar){
            let sendImageService = require('./send-image.service');
            let result = sendImageService.changeAvatar(data.avatar, user.avatar);
            callback(null, result);
        }
    }

    function analyzeUserNameChange(callback){
        if(data.username && (data.username != user.username) ){
            let result = editUserService.changeUsername(data.username, data.id);
            callback(null, result);
        }
    }

    function analyzeUserEmailChange(callback){

        if(data.email && (data.email != user.email)){
            let result = editUserService.changeEmail(data.email);
            callback(null, result);
        }
    }
};