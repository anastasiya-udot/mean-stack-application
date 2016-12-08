/**
 * Created by anastasiya on 8.12.16.
 */
let constant = require('../../../libs/constants').constant;

module.exports.initializeQueue = function(reqBody){

    return [
        initData,
        findUser
    ];

    function initData(callback){
        data = {
            resetPasswordToken : reqBody.token,
            resetPasswordExpires: {
                $gt: Date.now()
            }
        };
        callback(null, data);
    }

};

function findUser(data, callback){

   let User = require('../../../models/user').User;

    User.findOne(
        data,

        function(err, user) {

            if (err) {
                callback(constant.NO_VALID_USER);
                return;
            }

            if(user){
                callback(null, {"email": user.email});
            }
        }
    );
}
