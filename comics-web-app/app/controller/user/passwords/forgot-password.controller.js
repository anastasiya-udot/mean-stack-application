/**
 * Created by anastasiya on 10.11.16.
 */

let async                 = require('async');
let forgotPasswordService = require('../../../service/authentication/password/forgot-password.service.js');

module.exports.post = function(req, res, next) {

    async.waterfall(

        forgotPasswordService.initializeQueue(req),

        function(err, result){
            if(err) {
                res.json({"error" : err});
                return
            }
            if(result){
                res.json({"message" : result});
            }
        }
    )

};


