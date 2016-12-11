/**
 * Created by anastasiya on 25.11.16.
 */

module.exports.initializeUserQueue = function(data, user, host){
    return [
        analyzeUserNameChange,
        analyzeUserEmailChange,
        analyzeUserPasswordChange
    ];



    function analyzeUserNameChange(callback){

        if(!(data.username && (data.username != user.username))) {
            callback(null);
            return;
        }

        let changeUsername = require('./edit-data/edit-user-data.service.js').changeUsername;

        changeUsername(user, data.username, function(result){
            callback(null, result);
        });

    }

    function analyzeUserEmailChange(callback){

        if(!(data.email && (data.email != user.email))) {
            callback(null);
            return;
        }

        let changeEmail = require('./edit-data/edit-user-data.service.js').changeEmail;

        changeEmail(user, data.email, host, function(result){
            callback(null, result);
        });
    }

    function analyzeUserPasswordChange(callback){
        if (!data.password) {
            callback(null);
            return;
        }

        let changePassword = require('./edit-data/edit-user-data.service.js').changePassword;

        changePassword(user, data.password, data.previousPassword, data.confirmPassword, function(result){
            callback(null, result);
        });

    }
};


module.exports.initializeComicsQueue = function(comics, data) {

    return [
        analyzeComicsNameChange,
        analyzeComicsDescriptionChange
    ];

    function analyzeComicsNameChange(callback){

        if(!(data.comicsName && (data.comicsName != comics.name))) {
            callback(null);
            return;
        }

        let changeComicsName = require('./edit-data/edit-comics-data.service.js').changeComicsName;

        changeComicsName(comics, data.comicsName, function(result){
            callback(null, result);
        })

    }

    function analyzeComicsDescriptionChange(callback){

        if(!(data.comicsDescription != comics.description)) {
            callback(null);
            return;
        }

        let changeComicsDescription = require('./edit-data/edit-comics-data.service.js').changeComicsDescription;

        changeComicsDescription(comics, data.comicsDescription, function(result){
            callback(null, result);
        })

    }

};