/**
 * Created by anastasiya on 1.11.16.
 */
var passport = require('passport');

module.exports.post = function(req,res,next){
    passport.authenticate('local', function(err, user){
        // If Passport throws/catches an error
        if (err) return next(err);
        // If a user is found
        var token;
        token = user.generateJwt();
        res.status(200);
        res.json({
            "message": "Hello :)",
            "token" : token
        });

    })(req, res);
};

//  req.session.user = user._id || 0;