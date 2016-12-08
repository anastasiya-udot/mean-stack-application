/**
 * Created by anastasiya on 8.12.16.
 */
let constant    = require('../../../libs/constants').constant;

module.exports.initializeQueue = function(reqBody){
  return [
      extractData,
      findUser,
      resetPassword,

  ];

  function extractData(callback){

      let data = {
          email: reqBody.email,
          password: reqBody.password,
          confirmed: reqBody.confirmed
      };
      callback(null, data);
  }

};


function findUser(data, callback){

    let getUSerByEmail = require('../../user.service').getUserByEmail;

    getUSerByEmail(data.email, function(user){
        if(!user){
            callback(constant.NO_VALID_USER);
        } else {
            callback(null, user, data)
        }
    })

}

function resetPassword(user, data, callback){

    if(data.password != data.confirmed){
        callback(constant.DIFFERENT_PASSWORDS);
        return;
    }
    user.resetPasswordExpires = null;
    user.resetPasswordToken = null;
    user.hashedPassword = user.getHashPassword(data.password);

    user.save(function(err){
        if (err) {
            callback(constant.ERROR_SAVING);
            return;
        }
        callback(null, {"message" : constant.PASSWORD_CHANGED});
    });
}
