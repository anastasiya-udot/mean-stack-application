/**
 * Created by anastasiya on 25.10.16.
 */
var mongoose = require('mongoose');
var config = require('../../config');

mongoose.Promise = global.Promise;
mongoose.connect(config.get('mongoose:uri'), config.get('mongoose:options'));

module.exports = mongoose;

