/**
 * Created by anastasiya on 10.11.16.
 */
let resetUserService = require('../../../service/authentication/password/reset-password.service');
let async            = require('async');

module.exports.post = function(req,res){


    async.waterfall(

        resetUserService.initializeQueue(req.body),

        function(err, result){
            if(err) {
                res.json({"error" : err});
                return;
            }
            if(result){
                res.json(result);
            }
        }

    )


};