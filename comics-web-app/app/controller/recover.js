/**
 * Created by anastasiya on 11.11.16.
 */
var User        = require('../models/user').User;
var AuthError   = require('../error/error').AuthError;
var async       = require('async');

module.exports.post = function(req,res, next){
    async.waterfall(
        [
            function(callback){
                User.findOne({
                    email: req.body.email
                }, function(err, user){
                    if(err) return next(new AuthError("Sorry, we have an error"));
                    if(!user) return  next(new AuthError("Incorrect email"));
                    callback(null, user);
                })
            },
            function(user,callback){
                if( req.body.password !== req.body.password){
                    next(new AuthError("Passwords are different"));
                } else {
                    user.resetPasswordExpires = null;
                    user.resetPasswordToken = null;
                    user.hashedPassword = user.getHashPassword(req.body.password);
                    user.save(function(err){
                        if (err) return next(new AuthError("Error during saving"));
                        callback(null);
                    });
                }
            }
        ],
        function(err){
            if (err) return next(new AuthError("Error"));
            res.json({"message": "Password was successfully changed"});
        }
    );
};