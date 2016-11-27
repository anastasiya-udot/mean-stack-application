/**
 * Created by anastasiya on 11.11.16.
 */

var async                   = require('async');
var cofirmEmailService    = require('../../service/confirm-email.service.js');

module.exports.post = function(req,res, next){

    let tokenType = 'verifyRegistrToken';

    async.waterfall(

        cofirmEmailService.initializeQueue(tokenType, req.body.token),

        function(err){
        if(err) return next(err);
        res.end();
    });


};