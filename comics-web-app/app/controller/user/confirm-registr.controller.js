/**
 * Created by anastasiya on 11.11.16.
 */

var async                   = require('async');
var cofirmRegistrService    = require('../../service/confirm-registr.service');

module.exports.post = function(req,res, next){
    async.waterfall(

        cofirmRegistrService.initializeQueue(req.body.token),

        function(err){
        if(err) return next(err);
        res.end();
    });


};