/**
 * Created by anastasiya on 9.12.16.
 */

let constant = require('../../libs/constants').constant;

module.exports.initializeQueue = function(id){

  return [
      findComics,
      generateResponse
  ];

  function findComics(callback){

      let Comics = require('../../models/comics').Comics;

      Comics.findById(id, function(err, comics){
          if(err || !comics){
              callback(constant.NO_COMICS_FOUND);
              return;
          }
          callback(null, comics);
      })

  }
};

function generateResponse(comics, callback){

    let data = {
        comicsId: comics._id,
        comicsName: comics.name,
        authorId: comics.author._id,
        authorName: comics.author.name,
        comicsDate: comics.date,
        comicsDescription: comics.description,
        comicsCover: comics.cover.url
    };

    callback(null, data);
}
