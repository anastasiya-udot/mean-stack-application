var cloudinary = require('../libs/cloudinary').cloudinary;
var constant = require('../libs/constants').constant;

module.exports.changeAvatar = function(newImage, previousImage){
    cloudinary.uploader.upload(newImage, function(result) {
        if(result){
            cloudinary.uploader.destroy(previousImage, function(result) {
                    console.log(result);
            });
        } else {
            return constant.ERROR_DURING_IMAGE_UPLOAD
        }
    })

};