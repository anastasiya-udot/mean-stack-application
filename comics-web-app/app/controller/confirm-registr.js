/**
 * Created by anastasiya on 11.11.16.
 */
var User = require('../models/user').User;
var async = require('async');
var AuthError = require('../error/error').AuthError;

module.exports.post = function(req,res, next){

    async.waterfall([
        function(callback){
            var token = req.body.token;

            User.findOne({
                verifyRegistrToken: token
            }, function(err,user){
                console.log(token);
                console.log(err);
                if (err || !user) return next(new AuthError("No valid users"));
                callback(null,user);
            });
        },
        function(user, callback) {

            user.verifyRegistrToken = null;
            callback(null, user);
        },
        function(user, callback){

            user.save(function(err){
                if (err) return next(new AuthError("Error during saving"));
                callback(null);
            });
        }
    ], function(err){
        if(err) return next(new AuthError("Error"));
        res.end();
    })

};