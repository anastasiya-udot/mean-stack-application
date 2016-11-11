/**
 * Created by anastasiya on 1.11.16.
 */

var User = require('../models/user').User;
var AuthError = require('../error/error').AuthError;

module.exports.post = function(req, res, next) {

    var email = req.body.email,
        username = req.body.username,
        password = req.body.password,
        confirmedPassword = req.body.confirmedPassword;

    if(confirmedPassword === password) {
        User.findOne({email: email}, function (err, user) {
            if (err) return next(new AuthError("Error in sign up"));
            if (user) return next(new AuthError("User with such email already exist"));
            var newUser = new User();
            newUser.username = username;
            newUser.email = email;
            newUser.hashedPassword = newUser.getHashPassword(req.body.password);

            newUser.save(function(err) {
                if(err) {
                    return next(new AuthError("Error during saving"))
                }
                var token;
                token = newUser.generateJwt();
                res.status(200);
                res.json({
                    "token": token
                });
            });
        });
    } else {
        next(new AuthError("Passwords are different"));
    }


};