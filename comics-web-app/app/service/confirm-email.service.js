/**
 * Created by anastasiya on 25.11.16.
 */

var User               = require('../models/user').User;
var AuthError          = require('../error/error').AuthError;
var constant           = require('../libs/constants').constant;

module.exports.initializeQueue = function(tokenType, token) {

    return [
        findUserByToken,
        resetVerifyToken,
        saveChanges
    ];

    function findUserByToken(callback) {

        let getUserService = require('./get-user.service');
        getUserService.getUserByToken(tokenType, token, function(user){

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