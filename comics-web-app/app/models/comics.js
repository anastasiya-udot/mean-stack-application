/**
 * Created by anastasiya on 13.11.16.
 */
var mongoose    = require('../libs/mongoose');
var Schema      = mongoose.Schema;

// var chapterSchema = new Schema({ _id: Schema.Types.ObjectID});
// var authorSchema = new Schema({_id: Schema.Types.ObjectID, name: 'string'});

var comicsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        // authorSchema,
        type: String,
        required: true
    },

    // chapters: [chapterSchema],

    picture:{
        type: String,
    },

    date: {
        type: Date
    },
    declaration: {
        type: String
    }
});

exports.Comics = mongoose.model('Comics', comicsSchema);