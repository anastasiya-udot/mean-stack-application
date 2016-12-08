/**
 * Created by anastasiya on 5.12.16.
 */
let Comics = require('../../models/comics').Comics;
let constant = require('../../libs/constants').constant;
let imageService = require('./image.serivce.js');

module.exports.initializeQueue = function(reqBody){

    return [
        extractData,
        getComics,
        checkPermission,
        changeCover
    ];

    function extractData(callback){

        let data = {
            comics_id: reqBody.comics_id,
            cover: reqBody.file,
            user_id: reqBody.id
        };

        callback(null, data);
    }

    function getComics(data, callback) {

        Comics.findById(data.comics_id, function (err, comics) {
            if (err) return callback({"message" : constant.NO_COMICS_FOUND});
            if (comics) {
                callback(null, data, comics);
            } else {
                callback({"message" : constant.NO_COMICS_FOUND});
            }

        });

    }

    function checkPermission(data, comics, callback){

        if(comics.author._id == data.user_id){

            callback(null, data, comics);
        } else {
            callback({"message" : constant.ERROR_CHANGE_COMICS})
        }
    }

    function changeCover(data, comics, callback){

        imageService.changeCover(data, comics,function(err, result){
            if(err){
                callback(err);
            } else {
                result.data = {
                    comicsCover: comics.cover.url
                };
                callback(null, result);
            }
        });

    }

};