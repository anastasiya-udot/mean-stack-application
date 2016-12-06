/**
 * Created by anastasiya on 25.11.16.
 */
let constant = require('../libs/constants').constant;
let Comics = require('../models/comics').Comics;

module.exports.changeUsername = function(user, newUsername, callback){

    user.username = newUsername;

    user.save(function(err){
        if (err) {
            callback({ "message" : constant.ERROR_CHANGE_USERNAME } );
        } else {

            let cursor = Comics.find({ 'author._id': user._id.valueOf() }).cursor();

            cursor.on('data', function(doc){
                doc.author.name = newUsername;
                doc.save();
            });

            cursor.on('close', function(){
                callback({ "message" : constant.USERNAME_CHANGED,
                    "username": newUsername });
            });

        }
    });

};

module.exports.changeEmail = function(user, email, host, callback){

    let userEmailService = require('./user-email.service');
    let sendCallback = require('./send-email.service').sendConfirmChangeEmail;

    let tokenType = "verifyEmailChangeToken";

    user.tempEmail = email;

    user.save(function(err){
        if (err) {
            callback( { "message" : constant.ERROR_SAVING} );
        } else {
            userEmailService.verify(user, sendCallback, host, tokenType, function (err) {

                if (err) {
                    callback( { "message" : err.message } );
                } else {
                    callback( { "message" : constant.CONFIRM_MESSAGE } );
                }
            });
        }
    });

};

module.exports.changePassword = function(user, password, previousPassword, confirmPassword, callback) {
    if (password != confirmPassword){

        callback({"message": constant.DIFFERENT_PASSWORDS});
    } else {
        if (!user.checkPassword(previousPassword)){

            callback({ "message" : constant.ERROR_PREVIOUS_PASSWORD} );
        } else {

            user.hashedPassword = user.encryptPassword(password);

            user.save(function(err){
                if(err) {
                    callback({ "message" : constant.ERROR_SAVING})
                } else {
                    callback({ "message" : constant.PASSWORD_CHANGED})
                }
            })
        }
    }
};
