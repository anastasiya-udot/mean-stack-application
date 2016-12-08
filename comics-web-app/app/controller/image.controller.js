/**
 * Created by anastasiya on 27.11.16.
 */
let async = require('async');
let sizeof = require('object-sizeof');
let multiparty = require('multiparty');

module.exports.avatar = function(req,res){

   let avatarService = require('../service/image/avatar.service.js');

    console.log("size " + sizeof(req.body.file));

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


module.exports.cover = function(req,res){

    let coverService = require('../service/image/cover.service.js');

    async.waterfall(

        coverService.initializeQueue(req.body),

        function(err, result){

            let response = {};
            if (err){
                response.error = [];
                response.error.push({message : err.message});
                return res.send(response);
            }
            if(result) {
                response.message = [];
                response.message.push({message : result.message});
                response.data = result.data;
                return res.send(response);
            }
        }
    )

};