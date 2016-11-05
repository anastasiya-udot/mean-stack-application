/**
 * Created by anastasiya on 1.11.16.
 */
var User = require('../models/user').User;
var async = require('async');
var path = require('path');
var HttpError = require('../error/error').HttpError;

exports.get = function(req,res){
    var fs = require('fs');
    var file = new fs.ReadStream(path.join(__dirname.split('/').slice(0,-1).join('/'), '/views/login.html'));
    file.pipe(res);
};

exports.post = function(req,res,next){
    var username = req.body.username;
    var password = req.body.password;
    console.log(username);
    async.waterfall([
        function(callback){
            User.findOne({username: username}, callback);
        },

        function(user, callback) {
            if (user) {
                if (user.checkPassword(password)) {
                    console.log("here0");
                    callback(null, user);
                } else {
                    next(new HttpError(403, "Wrong password"));
                }
            } else {
                var user  = new User({username: username, password: password});
                console.log("here1");
                user.save(function(err){
                    if(err) return next(err);
                    callback(null, user);
                });
            }
        }
    ], function(err, user){
        if(err) return next(err);
        req.session.user = user._id || 0;
        res.send({});
    });

};

