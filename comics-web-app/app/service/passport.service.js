/**
 * Created by anastasiya on 7.11.16.
 */
var passport        = require('passport');
var LocalStrategy   = require('passport-local').Strategy;
var AuthError       = require('../error/error').AuthError;
var constant           = require('../libs/constants').constant;
var searchUserService = require('./get-user.service');

passport.use(new LocalStrategy({
    usernameField: 'email'
},
function(email, password, next){

    searchUserService.getUserByEmail(email, function(user){

        if(!user)
            return next(new AuthError(constant.EMAIL_ERROR));


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
