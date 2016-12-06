/**
 * Created by anastasiya on 25.11.16.
 */
let editUserService      = require('./edit-user-data.service.js');
let editComicsService    = require('./edit-comics-data.service');


module.exports.initializeUserQueue = function(data, user, host){
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


module.exports.initializeComicsQueue = function(comics, data) {

    return [
        analyzeComicsNameChange,
        analyzeComicsDescriptionChange
    ];

    function analyzeComicsNameChange(callback){

        if(data.comicsName && (data.comicsName != comics.name)){

           editComicsService.changeComicsName(comics, data.comicsName, function(result){
                callback(null, result);
           })
        } else {
            callback(null,null);
        }
    }

    function analyzeComicsDescriptionChange(callback){

        if(data.comicsDescription && (data.comicsDescription != comics.description)){

            editComicsService.changeComicsDescription(comics, data.comicsDescription, function(result){
                callback(null, result);
            })

        } else {
            callback(null,null);
        }
    }
};