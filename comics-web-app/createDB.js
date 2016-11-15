var mongoose = require('./app/libs/mongoose');
var async = require('async');
var User = require('./app/models/user').User;
var Comics = require('./app/models/comics').Comics;

async.series([
    open,
    dropDatabase,
    requireModels,
    createComics
], function(err, results){
    console.log(arguments);
    mongoose.disconnect();
});

function open(callback){
    mongoose.connection.on('open', callback);
}

function dropDatabase(callback){
    var db = mongoose.connection.db;
    db.dropDatabase(callback);
}

function requireModels(callback){
    async.each(Object.keys(mongoose.models), function(modelName, callback){
        mongoose.models[modelName].ensureIndexes(callback);
    }, callback)
}


function createComics(callback){

    var comics = [
        {name: 'Batman', author: 'supervasya', date: Date.now(), picture: "http://res.cloudinary.com/dq83k7kbp/image/upload/v1479150073/background_header8_dy2owd.jpg"},
        {name: 'Superman', author: '123', date: Date.now(), picture: "https://res.cloudinary.com/dq83k7kbp/image/upload/v1479215899/otdjs2leib631zqrapzv.jpg"},
        {name: 'Ironman', author: 'thetruehero', date: Date.now(), picture: "http://res.cloudinary.com/dq83k7kbp/image/upload/v1479217403/luxfon.com_16815_sfhqfo.jpg"}
    ];

    for (var i = 0; i<=10; i++){
        comics.push({name: 'Name' + i, author: 'Author' + i, date: Date.now()})
    }

    async.each(comics , function(comicsData, callback){
        var comics  = new Comics(comicsData, callback);
        comics.save(callback);
    }, callback);

}
