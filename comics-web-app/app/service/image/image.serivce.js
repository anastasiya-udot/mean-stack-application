let cloudinary = require('../../libs/cloudinary').cloudinary;
let constant = require('../../libs/constants').constant;


module.exports.changeAvatar = function(user, newImage, callback){

        cloudinary.uploader.upload(newImage, function(result) {

            if(!result.error){

                let prevID  = null;
                if(user.avatar){
                    prevID = user.avatar.public_id;
                }

                user.avatar = { "url": result.url,
                                "public_id": result.public_id };

                user.save(function(err){
                    if (err){

                        callback({"message" : constant.ERROR_SAVING});
                    }else {
                        if(prevID)
                            cloudinary.uploader.destroy(prevID);
                        callback(null, {"message" : constant.AVATAR_CHANGED,
                                  "avatar": user.avatar.url });
                    }
                })
            } else {
                callback({ "message" : constant.ERROR_DURING_IMAGE_UPLOAD} );
            }
        })

};

module.exports.changeCover = function(data, comics, callback){
    console.log(data.cover);
    cloudinary.uploader.upload(data.cover, function(result) {
        console.log(result);
        if(!result.error){

            let prevID  = null;
            if(comics.cover){
                prevID = comics.cover.public_id;
            }

            comics.cover = { "url": result.url, "public_id": result.public_id };

            comics.save(function(err){
                if (err){

                    callback({"message" : constant.ERROR_SAVING});
                }else {
                    if(prevID)
                        cloudinary.uploader.destroy(prevID);
                    callback(null, {"message" : constant.COVER_CHANGED,
                        "cover": comics.cover.url });
                }
            })
        } else {

            callback({ "message" : constant.ERROR_DURING_IMAGE_UPLOAD} );
        }
    })

};


module.exports.deleteCover = function(cover){
    cloudinary.uploader.destroy(cover.public_id);
};



module.exports.getAvatar = function(user){
    if(user.avatar){
        console.log(user.avatar.name);
        let imgHTML = cloudinary.image(user.avatar.name, {height: 200, width: 200, crop: "fill"});
        console.log(imgHTML);
        return imgHTML;
    }
};