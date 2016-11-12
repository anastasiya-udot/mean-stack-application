/**
 * Created by anastasiya on 11.11.16.
 */
var User        = require('../../models/user').User;
var AuthError   = require('../../error/error').AuthError;
var async       = require('async');
var constant    = require('../../libs/constants').constant;

module.exports.post = function(req,res, next){

    async.waterfall(
        [
            function(callback){

                User.findOne({
                    email: req.body.email
                }, function(err, user){

                    if(err || !user) return  next(new AuthError(constant.EMAIL_ERROR));
                    callback(null, user);
                })
            },
            function(user,callback){

                if( req.body.password !== req.body.password){
                    next(new AuthError(constant.DIFFERENT_PASSWORDS));

                } else {

                    user.resetPasswordExpires = null;
                    user.resetPasswordToken = null;
                    user.hashedPassword = user.getHashPassword(req.body.password);

                    user.save(function(err){
                        if (err) return next(new AuthError(constant.ERROR_SAVING));

                        callback(null);
                    });
                }
            }
        ],
        function(err){

            if (err) return next(new AuthError(constant.ERROR));
            res.json({"message": constant.SUCCESS_PASSWORD_CHANGED});
        }
    );
};