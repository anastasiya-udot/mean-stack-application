/**
 * Created by anastasiya on 7.11.16.
 */
var passport        = require('passport');
var LocalStrategy   = require('passport-local').Strategy;
var User            = require('../../models/user').User;
var AuthError       = require('../../error/error').AuthError;
var constant           = require('../../libs/constants').constant;

passport.use(new LocalStrategy({
    usernameField: 'email'
},
function(username, password, next){

    User.findOne({email: username}, function(err, user){
        if (err) {new AuthError(constant.EMAIL_ERROR); }
        //Return if user not found in database
        if(!user){
            return next(new AuthError(constant.EMAIL_ERROR));
        }

        if(user.verifyRegistrToken !== null){
            return next(new AuthError(constant.NOT_VERIFIED_EMAIL));
        }
        //Return if password is wrong
        if (!user.checkPassword(password)){
            return next(new AuthError(constant.PASSWORD_ERROR));
        }
        
        //if credentials are correct, return the user object
        return next(null,user);
    })
}
));

passport.serializeUser(function(user, next) {
    next(null, user.id);
});

passport.deserializeUser(function(id, next) {
    User.findById(id, function(err, user) {
        next(err, user);
    });
});