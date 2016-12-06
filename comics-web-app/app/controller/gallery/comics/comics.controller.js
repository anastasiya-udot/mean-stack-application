/**
 * Created by anastasiya on 29.11.16.
 */

let comicsService = require('../../../service/comics.service.js');
let async = require('async');

module.exports.new = function(req,res){

    async.waterfall(

        comicsService.initializeNewQueue(req.body),

        function(err, result){

            let response = {};

            if (err){
                response.error = [];
                response.error.push({message: err.message});
                return res.send(response);
            }
            if(result) {
                response.message = [];
                response.message.push({ message:  result.message});
                response.data = result.data;
                return res.send(response);
            }
        }
    )

};


module.exports.edit = function(req,res){

    let id = req.url.split('/')[3];

    async.waterfall(

        comicsService.initializeEditQueue(req.body, id),

        function(err, result){
            let response = {};
            if (err){
                response.error = [];
                response.error.push({message: err.message});
                return res.send(response);
            }
            if(result) {
                return res.send(result);
            }
        }
    )

};