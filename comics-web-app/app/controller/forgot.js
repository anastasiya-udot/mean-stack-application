/**
 * Created by anastasiya on 10.11.16.
 */
var User        = require('../models/user').User;
var AuthError   = require('../error/error').AuthError;
var async       = require('async');
var crypto      = require('crypto');


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
                            return next(new AuthError("There is no user with such email"));

                        user.resetPasswordToken = token;
                        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

                        user.save(function (err) {
                            if (err) return next(new AuthError("Error while saving user"));
                            callback(null, token, user);
                        });
                    });
                },

                function(token, user, callback){
                    require('./email-send').sendForgotEmail(user.email, req.headers.host, token, callback);
                }
            ],
            function(err, email){

                if(err) return next(new AuthError("Sending error"));
                res.json({"message": "Confirmation was sent on your email"})

            }
        )
    };


