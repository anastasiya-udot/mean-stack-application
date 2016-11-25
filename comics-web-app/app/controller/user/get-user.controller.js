/**
 * Created by anastasiya on 19.11.16.
 */

var constant = require('../../libs/constants').constant;
var searchUserService = require('../../service/get-user.service');

module.exports.get = function(req, res){
    let id = req.url.split('/')[3];

    searchUserService.getUserById(id, function(user){

        if(user){
            res.status(200).json({
                id: user._id,
                username: user.username,
                email: user.email,
                avatar: user.avatar,
                followers: user.followers
            })

        } else {
            res.status(404).send({ "message": constant.USER_NOT_FOUND});
        }
    });

};