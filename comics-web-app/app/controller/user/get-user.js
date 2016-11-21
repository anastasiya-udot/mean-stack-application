/**
 * Created by anastasiya on 19.11.16.
 */
var User = require('../../models/user').User;
var constant = require('../../libs/constants').constant;

module.exports.get = function(req, res, next){
    var id = req.url.split('/')[3];
    User.findOne({
        _id: id
    }, function(err, user){
        if(err || !user) {
            console.error(err || constant.USER_NOT_FOUND);
            res.status(404).send({ "message": constant.USER_NOT_FOUND});
        } else {
            res.status(200).json({
                id: user._id,
                username: user.username,
                email: user.email,
                avatar: user.avatar,
                followers: user.followers
            })
        }
    })
};