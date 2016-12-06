/**
 * Created by anastasiya on 25.10.16.
 */
var crypto      =  require('crypto');
var jwt         = require('jsonwebtoken');
var mongoose    = require('../libs/mongoose');
var Schema      = mongoose.Schema;
var constant    = require('../libs/constants').constant;


var avatarSchema = new Schema({public_id: String, url: String});

var userSchema = new Schema({
    username: {
        type: String,
        unique: true,
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
    avatar: avatarSchema,

    resetPasswordToken: String,
    resetPasswordExpires: Date,
    verifyRegistrToken: String,
    verifyEmailChangeToken: String,
    tempEmail: String
});

userSchema.methods.encryptPassword = function(password){
    return crypto.createHmac('sha1', this.salt).
    update(password).
    digest('hex');
};


userSchema.methods.checkPassword = function(password){
    return this.encryptPassword(password) === this.hashedPassword;
};

userSchema.methods.getHashPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    return  this.encryptPassword(password);
};

userSchema.methods.generateJwt = function(){
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        id: this._id,
        email: this.email,
        name: this.name
    }, constant.SECRET_JWT);
};

userSchema.methods.getHashPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    return  this.encryptPassword(password);
};


exports.User = mongoose.model('User', userSchema);