/**
 * Created by anastasiya on 25.11.16.
 */

let async                   = require('async');
let confirmEmailService    = require('../../../service/email/confirm-email.service');

module.exports.post = function(req,res, next){

    let tokenType = 'verifyEmailChangeToken';
    console.log(req.body);
    async.waterfall(

        confirmEmailService.initializeQueue(tokenType, req.body.token),

        function(err){
            if(err) {
                res.json({"err" : err.message});
                return;
            }
            res.end();
        });


};