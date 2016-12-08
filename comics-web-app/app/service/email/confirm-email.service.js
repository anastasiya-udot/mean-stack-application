/**
 * Created by anastasiya on 25.11.16.
 */

let constant  = require('../../libs/constants').constant;
let AuthError = require('../../error/error').AuthError;

module.exports.initializeQueue = function(tokenType, token) {

    return [
        findUserByToken,
        resetVerifyToken,
        saveChanges
    ];

    function findUserByToken(callback) {

        let getUserByToken = require('./../user.service.js').getUserByToken;

        getUserByToken(tokenType, token, function(user){
            if (!user) {
                callback(new AuthError(constant.NO_VALID_USER));
            } else{
                callback(null, user);
            }

        })

    }

    function resetVerifyToken(user, callback) {

        user[tokenType] = null;

        let tempEmail = user.tempEmail || null;

        if(tempEmail){
            user.email = user.tempEmail;
            user.tempEmail = null;
        }

        callback(null, user);
    }

    function saveChanges(user, callback) {

        user.save(function (err) {
            if (err) {
                callback(new AuthError(constant.ERROR_SAVING));
            } else {
                callback(null);
            }
        });
    }
};