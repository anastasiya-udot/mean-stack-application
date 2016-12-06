/**
 * Created by anastasiya on 29.11.16.
 */

let Comics = require('../models/comics').Comics;
let constant = require('../libs/constants').constant;
let getUserService  = require('./get-user.service');

module.exports.initializeNewQueue = function(data){
    return [
        findUser,
        createComics,
        generateResponse
    ];

    function findUser(callback){
        getUserService.getUserById(data.id, function(user){
            if(user){
                callback(null, user)
            } else {
                callback({"message": constant.USER_NOT_FOUND});
            }
        })
    }

    function createComics(user, callback){

        let comics = new Comics();

        comics.name = data.name;
        comics.author = { "_id": data.id, "name": user.username };
        comics.description = data.description;
        comics.date = new Date();
        comics.cover = {};

        comics.save(function(err, comics){
            if (err){
                callback({"message": constant.ERROR_SAVING});
            } else {
                callback(null, comics);
            }
        });
    }

    function generateResponse(comics, callback) {

        let data = {
            author: comics.author,
            comicsId: comics._id,
            comicsName: comics.name,
            comicsDate: comics.date

        };

        if (comics.cover) {
            data.comics_cover = comics.cover.url;
        }

        let response = {
            "message": constant.COMICS_CREATED,
            data: data
        };

        callback(null, response);
    }
};

module.exports.initializeEditQueue = function(req, comicsId) {

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

        let analyzeChangesService = require('./analyze-changes.service');
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

