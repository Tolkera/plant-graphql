var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var plantSchema = new Schema({
    name: String,
    color: String,
    watered: Date
}, {collection:"plants"});

module.exports =  mongoose.model('Plant', plantSchema);