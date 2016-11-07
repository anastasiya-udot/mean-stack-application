var mongoose = require('./app/libs/mongoose');
var async = require('async');
var User = require('./app/models/user').User;

async.series([
    open,
    dropDatabase,
    requireModels,
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
        {email: 'lalala@lala', password: 'supervasya', salt: 'sdsad'},
        {email: 'lololo@lolo', password: '123', salt:'eoeoeoe'},
        {email: 'admin', password: 'thetruehero', salt:'oqoqoqo'}
    ];

    async.each(users, function(userData, callback){
        var user = new User(userData, callback);
        user.save(callback);
    }, callback);

}
