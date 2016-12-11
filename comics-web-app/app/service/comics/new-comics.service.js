/**
 * Created by anastasiya on 29.11.16.
 */
let constant = require('../../libs/constants').constant;

module.exports.initializeQueue = function(data){
    return [
        findUser,
        createComics,
        generateResponse
    ];

    function findUser(callback){

        let getUserById  = require('./../user.service.js').getUserById;

        getUserById(data.id, function(user){
            if(user){
                callback(null, user)
            } else {
                callback({"message": constant.USER_NOT_FOUND});
            }
        })
    }

    function createComics(user, callback){

        let Comics = require('../../models/comics').Comics;

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
            comicsDate: comics.date,
            comicsDescription: comics.description

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

