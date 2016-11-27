/**
 * Created by anastasiya on 27.11.16.
 */
var async = require('async');
var avatarService = require('../../service/avatar.service');

module.exports.post = function(req,res){
    async.waterfall(

        avatarService.initializeQueue(req.body),

    function(err, result){
        if (err){
            res.send([err])
        } else {
            res.send([result])
        }

    })

};