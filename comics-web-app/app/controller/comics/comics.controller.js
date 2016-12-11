/**
 * Created by anastasiya on 29.11.16.
 */

let async = require('async');

module.exports.new = function(req,res){

    let comicsService = require('../../service/comics/new-comics.service.js');

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

module.exports.get = function(req, res){

    let id = req.url.split('/')[3];
    let comicsService = require('../../service/comics/get-comics.service');

    async.waterfall(

        comicsService.initializeQueue(id),

        function(err, result){
            if(err){
                res.json({"error" : err});
                return;
            }
            if(result){
                res.json({"comics" : result});
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

module.exports.delete = function(req,res){

    let deleteComicsService = require('../../service/delete/delete-comics.service');

    async.waterfall(

        deleteComicsService.initializeQueue(req.body),

        function(err, result){

            let response = {};

            if (err){
                response.error = err;
                return res.send(response);
            }
            if(result) {
                response.message = result;
                return res.send(response);
            }
        }
    )

};