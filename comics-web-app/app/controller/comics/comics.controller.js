/**
 * Created by anastasiya on 29.11.16.
 */

let async = require('async');

module.exports.new = function(req,res){

    let comicsService = require('../../service/comics.service');

    async.waterfall(

        comicsService.initializeQueue(req.body),

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
    let comicsService = require('../../service/change-data/change-comics-info.service');

    async.waterfall(

        comicsService.initializeQueue(req.body, id),

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