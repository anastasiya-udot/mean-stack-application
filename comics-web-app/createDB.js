var mongoose = require('./app/libs/mongoose');
var async = require('async');
var User = require('./app/models/user').User;
var Comics = require('./app/models/comics').Comics;
var ObjectId = require('mongodb').ObjectID;

async.series([
    open,
    dropDatabase,
    requireModels,
   // createUsers,
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

function createUsers(callback){
    var users = [
        {"_id" : ObjectId("582fa70f09ebe47bc4d2842c"), "hashedPassword" : "c3877dfc62e3ae2a2a935f8dd88d106dd7e3cc05", "verifyRegistrToken":  null,
            "salt" : "2e6a00d9c164b30fa8cfd746ba64225a", "email" : "anastasiya.udot@gmail.com", "username" : "Anastasiya",
        "avatar": "https://res.cloudinary.com/dq83k7kbp/image/upload/c_fill,h_200,w_200/v1479518305/3oiArpfYZko_a21ovh.jpg",
        "followers": [{"_id": ObjectId("5832fc859890e10d1f9439e5"), username: "Supervasyua" }]},
        {"_id" : ObjectId("5832fc859890e10d1f9439e5"), "hashedPassword" : "c43089f56c77a6122b5dcccfc5082f201aa28356", "verifyRegistrToken":  null,
            "salt" : "d6c0381b3d5556b0a56e120ffd877039", "email" : "tugoje@rootfest.net", "username" : "Supervasyua"}
    ];

    async.each(users , function(userData, callback){
        var user  = new User(userData, callback);
        user.save(callback);
    }, callback);
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
