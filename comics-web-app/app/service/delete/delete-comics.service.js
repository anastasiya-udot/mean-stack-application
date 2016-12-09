/**
 * Created by anastasiya on 9.12.16.
 */
let constant = require('../../libs/constants').constant;
let Comics = require('../../models/comics').Comics;

module.exports.initializeQueue = function(reqBody){

  return [
      extractData,
      findComics,
      checkPermission,
      deleteComics
  ];

  function extractData(callback){

      let data = {
          comicsId: reqBody.comicsId,
          userId: reqBody.userId
      };

      callback(null, data);
  }

};

function findComics(data, callback){

    Comics.findById(data.comicsId, function(err, comics){

        if(!comics || err){
            callback(constant.NO_COMICS_FOUND);
            return;
        }
        callback(null, data, comics)
    })
}

function checkPermission(data, comics, callback){

    if(!(comics.author._id == data.userId)){
        callback(constant.PERMISSION_ERROR);
        return;
    }
    callback(null, comics)
}


function deleteComics(comics, callback){

    Comics.remove({ "_id" : comics._id}, function(err){

        if(err){
            callback(constant.ERROR_DELETING);
            return;
        }

        let deleteCover = require('../image/image.serivce').deleteCover;

        deleteCover(comics.cover);

        callback(null, constant.DELETE_SUCCESS);
    })
}

