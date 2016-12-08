/**
 * Created by anastasiya on 8.12.16.
 */
let getUserByEmail  = require('../../user.service').getUserByEmail;
let crypto          = require('crypto');
let constant        = require('../../../libs/constants').constant;

module.exports.initializeQueue = function(req){

    return [
        extractData,
        generateToken,
        findUser,
        resetPassword,
        sendEmail
    ];

    function extractData(callback){

        let email = req.body.email;
        callback(null, email);
    }

    function sendEmail(token, user, callback){

        let sendForgotEmail = require('./../../email/send-email.service.js').sendForgotEmail;

        sendForgotEmail(user, req.headers.host, token, function(err){
            if (err) {
                callback(constant.ERROR_SENDING);
                return;
            }
            callback(null, constant.CONFIRM_MESSAGE);
        });
    }
};

function generateToken(email, callback){

    crypto.randomBytes(20, function (err, buf) {
        callback(null, email, buf.toString('hex'));
    });
}

function findUser(email, token, callback){

    getUserByEmail(email, function(user){
        if (!user){
            callback(constant.EMAIL_ERROR);
            return;
        }
        callback(null,user,token);

    });
}


function resetPassword(user, token, callback){

    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    user.save(function (err) {
        if (err){
            callback(constant.ERROR_SAVING);
        }
        callback(null, token, user);
    });
}

