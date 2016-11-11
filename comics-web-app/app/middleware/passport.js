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
function(username, password, done){
    User.findOne({email: username}, function(err, user){
        if (err) {new AuthError("There is no user with such email"); }
        //Return if user not found in database
        if(!user){
            return done(new AuthError("There is no user with such email"));
        }
        //Return if password is wrong
        if (!user.checkPassword(password)){
            return done(new AuthError("Incorrect password"));
        }
        //if credentials are correct, return the user object
        return done(null,user);
    })
}
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});