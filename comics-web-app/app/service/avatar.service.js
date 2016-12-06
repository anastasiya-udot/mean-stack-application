/**
 * Created by anastasiya on 27.11.16.
 */

var constant = require('../libs/constants').constant;
var imageService = require('./image.serivce.js');

module.exports.initializeQueue = function(reqBody){

    return [
        extractData,
        getUser,
        changeAvatar
    ];


    function extractData(callback){

        let data = {
            id: reqBody.id,
            avatar: reqBody.file
        };
        callback(null, data);
    }

    function getUser(data, callback) {

        let getUserService = require('./get-user.service');

        getUserService.getUserById(data.id, function (user) {

            if (user) {
                callback(null, data, user);
            } else {
                callback({"message" : constant.NO_VALID_USER});
            }

        });

    }

    function changeAvatar(data, user, callback){

        if (data.avatar){
            imageService.changeAvatar(user, data.avatar,function(err, result){
                if(err){
                    callback(err);
                } else {
                    callback(null, result);
                }
            });
        } else {
            callback(null, null);
        }
    }

};


module.exports.getAvatar = imageService.getAvatar;