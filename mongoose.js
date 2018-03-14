var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var plantSchema = new Schema({
    name: String,
    purchased: String,
    seller: String,
    watered: Date
}, {collection:"plants"});

module.exports =  mongoose.model('Plant', plantSchema);