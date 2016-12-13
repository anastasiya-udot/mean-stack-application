let mongoose    = require('../libs/mongoose');
let Schema      = mongoose.Schema;

let imageSchema = new Schema({public_id: String, url: String});
let partSchema = new Schema({ _id: String, image: imageSchema, number: Number, text: String});

let pageSchema = new Schema({

    comics: {
        type: String,
        required:true
    },

    author: {
        type: String,
        required:true
    },

    parts: [partSchema]

});

exports.Page = mongoose.model('Comics', pageSchema);