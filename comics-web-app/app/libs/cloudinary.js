/**
 * Created by anastasiya on 14.11.16.
 */
let cloudinary = require('cloudinary');
let constant = require('./constants').constant;

cloudinary.config({
    cloud_name: constant.CLOUD_NAME,
    api_key: constant.CLOUD_API_KEY,
    api_secret: constant.CLOUD_API_SECRET
});

module.exports.cloudinary = cloudinary;

