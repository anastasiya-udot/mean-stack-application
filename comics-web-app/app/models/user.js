/**
 * Created by anastasiya on 25.10.16.
 */
var crypto      =  require('crypto');
var jwt         = require('jsonwebtoken');
var mongoose    = require('../libs/mongoose');
var Schema      = mongoose.Schema;

var schema = new Schema({
    username: {
        type: String,
        unique: false,
        required: true
    },
    hashedPassword: {
        type: String,
        unique: false,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    confirmed:{

    }
});

schema.methods.encryptPassword = function(password){
    return crypto.createHmac('sha1', this.salt).
    update(password).
    digest('hex');
};


schema.methods.checkPassword = function(password){
    return this.encryptPassword(password) === this.hashedPassword;
};

schema.methods.getHashPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    return  this.encryptPassword(password);
};

schema.methods.generateJwt = function(){
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name,
        exp: parseInt(expiry.getTime() / 1000),
    }, process.env.SECRET_USER_STRING);
};

exports.User = mongoose.model('User', schema);