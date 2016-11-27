/**
 * Created by anastasiya on 25.11.16.
 */
var editUserService      = require('./edit-user-data.service.js');

module.exports.initializeQueue = function(data, user, host){
    return [
        analyzeUserNameChange,
        analyzeUserEmailChange,
        analyzeUserPasswordChange
    ];

    function analyzeUserNameChange(callback){

        if(data.username && (data.username != user.username) ){

            editUserService.changeUsername(user, data.username, function(result){

                callback(null, result);
            });
        } else {
            callback(null, null);
        }
    }

    function analyzeUserEmailChange(callback){

        if(data.email && (data.email != user.email)){

            editUserService.changeEmail(user, data.email, host, function(result){
                callback(null, result);
            });

        } else {
            callback(null, null);
        }
    }

    function analyzeUserPasswordChange(callback){
        if (data.password){
            editUserService.changePassword(user, data.password, data.previousPassword, data.confirmPassword, function(result){
                callback(null, result);
            });
        } else {
            callback(null,null);
        }
    }
};