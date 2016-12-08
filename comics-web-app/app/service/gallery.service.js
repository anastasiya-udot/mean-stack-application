/**
 * Created by anastasiya on 6.12.16.
 */
let Comics = require('../models/comics').Comics;

module.exports.initializeBrowserGalleryQueue = function(){

    return [
        findAllComics,
        generateResponse
    ];
};

module.exports.initializeAccountGalleryQueue = function(user_id){
    return [
        findUserComics,
        generateResponse
    ];

    function findUserComics(callback){
        Comics.find( { 'author._id': user_id }, function(err, cursor){
            callback(null,cursor);
        });
    }

};

function findAllComics(callback){
    Comics.find(function(err, cursor){
        callback(null,cursor);
    });
}

function generateResponse(cursor, callback){
    let response = [];
    cursor.forEach(function(elem){
        let data = {
            comicsId: elem._id,
            comicsName: elem.name,
            comicsDate: elem.date,
            comicsCover: elem.cover.url,
            comicsDescription: elem.description,
            authorId: elem.author._id,
            authorName: elem.author.name,
        };
        response.push(data);
    });

    callback(null, response);
}

