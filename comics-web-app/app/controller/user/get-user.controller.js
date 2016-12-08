/**
 * Created by anastasiya on 19.11.16.
 */

let constant = require('../../libs/constants').constant;
let getUserById = require('../../service/user.service.js').getUserById;

module.exports.get = function(req, res){

    let id = req.url.split('/')[3];

    getUserById(id, function(user){

        if(!user) {
            res.status(404).send({ "message": constant.USER_NOT_FOUND});
            return;
        }

        let avatar = null;

        if(user.avatar)
            avatar = user.avatar.url;

        let data = {
            id: user._id,
            username: user.username,
            avatar: avatar,
            email: user.email
        };

        res.json({ "data" : data })

    });

};