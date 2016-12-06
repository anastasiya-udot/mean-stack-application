/**
 * Created by anastasiya on 11.11.16.
 */

let async                   = require('async');
let cofirmEmailService    = require('../../service/confirm-email.service.js');

module.exports.post = function(req,res, next){

    let tokenType = 'verifyRegistrToken';
    console.log(req.body.token);
    async.waterfall(

        cofirmEmailService.initializeQueue(tokenType, req.body.token),

        function(err){
        if(err) return next(err);
        res.end();
    });


};