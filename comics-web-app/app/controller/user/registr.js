/**
 * Created by anastasiya on 1.11.16.
 */

var User        = require('../../models/user').User;
var AuthError   = require('../../error/error').AuthError;
var async       = require('async');
var constant    = require('../../libs/constants').constant;

module.exports.post = function(req, res, next) {
    async.waterfall(
        [
            function(callback){
                var data  = {
                        email : req.body.email,
                        username : req.body.username,
                        password : req.body.password,
                        confirmed : req.body.confirmed
                };

                if(data.confirmed !== data.password)
                    next(new AuthError(constant.DIFFERENT_PASSWORDS));

                callback(null, data);
            },
            function(data, callback){

                User.findOne({email: data.email}, function (err, user) {

                    if (err) return next(new AuthError(constant.ERROR_SIGN_UP));

                    if (user) return next(new AuthError(constant.USER_EXIST));

                    var newUser = new User();

                    newUser.username = data.username;
                    newUser.email = data.email;
                    newUser.hashedPassword = newUser.getHashPassword(data.password);
                    callback(null, newUser);
                });
            },
            function(user, callback){

                var crypto = require('crypto');
                    crypto.randomBytes(20, function (err, buf) {
                        callback(null, buf.toString('hex'), user);
                    });
            },
            function(token, user, callback){
                var email = require('./email-send');

                email.sendVerificationEmail(user, req.headers.host, token, function(err){
                    if (err) return next(new AuthError(constant.ERROR_SENDING));
                    callback(null, token, user);
                });
            },

            function(token, user, callback){
                user.verifyRegistrToken = token;

                user.save(function(err) {
                    if (err)  return next(new AuthError(constant.ERROR_SAVING));
                    callback(null, user);
                });
            }
        ],
        function(err,user){
            if(err) return next(new AuthError(constant.ERROR));

            res.json({"message" : constant.CONFIRM_MESSAGE});
        }

    );


};