/**
 * Created by anastasiya on 10.11.16.
 */
var User        = require('../../models/user').User;
var AuthError   = require('../../error/error').AuthError;
var async       = require('async');
var crypto      = require('crypto');
var constant    = require('../../libs/constants').constant;


module.exports.post = function(req, res, next) {

    var email = req.body.email;
        async.waterfall(
            [
                function(callback){
                    crypto.randomBytes(20, function (err, buf) {
                        callback(null, buf.toString('hex'));
                    });
                },

                function(token, callback){
                    User.findOne({email: email}, function (err, user) {
                        if (!user)
                            return next(new AuthError(constant.EMAIL_ERROR));

                        user.resetPasswordToken = token;
                        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

                        user.save(function (err) {
                            if (err) return next(new AuthError(constant.ERROR_SAVING));
                            callback(null, token, user);
                        });
                    });
                },

                function(token, user, callback){
                    var sendEmailService = require('./../../service/send-email.service');
                    sendEmailService.sendForgotEmail(user.email, req.headers.host, token, function(err){
                        if (err) return next(new AuthError(constant.ERROR_SENDING));
                        callback(null);
                    });
                }
            ],
            function(err){

                if(err) return next(new AuthError(constant.ERROR));
                res.json({"message": constant.CONFIRM_MESSAGE})

            }
        )
    };


