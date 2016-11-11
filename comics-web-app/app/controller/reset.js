/**
 * Created by anastasiya on 10.11.16.
 */
var User = require('../models/user').User;

module.exports.post = function(req,res){
    User.findOne(
        {
            resetPasswordToken: req.body.token,
            resetPasswordExpires: {
                $gt: Date.now()
            }
        },
        function(err, user) {

            if (err) {
                return next(err);
            }

            if(user){
                res.json({"email": user.email});
            }
        }
    );
};