/**
 * Created by anastasiya on 25.11.16.
 */
var AuthError   = require('../error/error').AuthError;
var async       = require('async');
var constant    = require('../libs/constants').constant;


module.exports.verify = function(user, send, host, tokenType, callback){

    async.waterfall([
            generateToken,
            sendMail,
            setVerifyToken
        ],

    function(err){
        if(err) return callback(err);
        callback(null);
    });

    function generateToken(callback){

        let crypto = require('crypto');

        crypto.randomBytes(20, function (err, buf) {
            callback(null, buf.toString('hex'));
        });
    }

    function sendMail(token, callback){

        send(user, host, token, function(err){
            if (err) {
                let err = new AuthError(constant.ERROR_SENDING);
                callback(err);
            }
            callback(null, token);
        });
    }

    function setVerifyToken(token, callback){

        user[tokenType] = token;

        user.save(function(err) {
            if (err) {
                let err = new AuthError(constant.ERROR_SAVING);
                callback(err);
            }
            callback(null);
        });
    }
};