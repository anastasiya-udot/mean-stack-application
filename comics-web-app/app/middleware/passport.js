/**
 * Created by anastasiya on 7.11.16.
 */
var passport        = require('passport');
var LocalStrategy   = require('passport-local').Strategy;
var User            = require('../models/user').User;
var AuthError       = require('../error/error').AuthError;

passport.use(new LocalStrategy({
    usernameField: 'email'
},
function(username, password, next){
    User.findOne({email: username}, function(err, user){
        if (err) {new AuthError("There is no user with such email"); }
        //Return if user not found in database
        if(!user){
            return next(new AuthError("There is no user with such email"));
        }
        //Return if password is wrong
        if (!user.checkPassword(password)){
            return next(new AuthError("Password is wrong"));
        }
        //if credentials are correct, return the user object
        return next(null,user);
    })
}
));