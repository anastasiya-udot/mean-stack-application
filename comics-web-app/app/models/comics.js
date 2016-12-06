/**
 * Created by anastasiya on 13.11.16.
 */
let mongoose    = require('../libs/mongoose');
let Schema      = mongoose.Schema;

let authorSchema = new Schema({ _id: String, name: String});
let coverSchema = new Schema({public_id: String, url: String});

let comicsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    author: authorSchema,

    cover: coverSchema,

    description:{
        type: String
    },

    date: {
        type: Date
    }
});

exports.Comics = mongoose.model('Comics', comicsSchema);