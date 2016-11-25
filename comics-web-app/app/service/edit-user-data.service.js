/**
 * Created by anastasiya on 25.11.16.
 */
var constant = require('../libs/constants').constant;
var searchUserService = require('./get-user.service');

module.exports.changeUsername = function(newUsername, id){

    let user = searchUserService.getUserById(id);

    if(user){
        user.save({username: newUsername}, function(err){
           if (err) return constant.ERROR_CHANGE_USERNAME;
        })

    } else {
        return constant.ERROR_CHANGE_USERNAME;
    }
};

module.exports.changeEmail = function(email){

};
