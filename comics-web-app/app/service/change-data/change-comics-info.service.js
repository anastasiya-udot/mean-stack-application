/**
 * Created by anastasiya on 8.12.16.
 */

let Comics = require('../../models/comics').Comics;
let constant = require('../../libs/constants').constant;

module.exports.initializeQueue = function(req, comicsId) {

    return [
        extractData,
        findComics,
        checkPermission,
        analyzeChanges,
        generateResponse
    ];

    function extractData(callback){

        let data ={
            userId: req.id,
            comicsId: comicsId,
            comicsName: req.name,
            comicsDescription: req.description
        };

        callback(null,data);
    }

    function findComics(data, callback){

        Comics.findById(data.comicsId, function(err, comics){
            if(err || !comics){
                callback({message : constant.NO_COMICS_FOUND});
            }
            if(comics){

                callback(null, comics, data);
            }
        })
    }

    function checkPermission(comics, data, callback){

        if(comics.author._id == data.userId){
            callback(null, comics, data);
        } else {
            callback({message : constant.PERMISSION_ERROR});
        }
    }

    function analyzeChanges(comics, data, callback){

        let analyzeChangesService = require('../change-data/analyze-changes.service.js');
        let async = require('async');

        async.series(

            analyzeChangesService.initializeComicsQueue(comics, data),

            function(err, results){

                if (err) {
                    callback( { "message" : constant.ERROR } );
                } else {
                    callback(null, comics, results);
                }
            }
        )
    }

    function generateResponse(comics, results, callback){

        let response = {
            data: {comicsId: comics._id,
                comicsName: comics.name,
                comicsDescription: comics.description},
            message: results
        };

        callback(null, response);
    }
};
