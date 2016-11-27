/**
 * Created by anastasiya on 25.11.16.
 */

var async                   = require('async');
var confirmEmailService    = require('../../service/confirm-email.service.js');

module.exports.post = function(req,res, next){

    let tokenType = 'verifyEmailChangeToken';

    async.waterfall(

        confirmEmailService.initializeQueue(tokenType, req.body.token),

        function(err){
            if(err) return next(err);
            res.end();
        });


};