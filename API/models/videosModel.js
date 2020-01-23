const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const videosSchema = new Schema({
    title:String,
    content:String,
    section:String
});
module.exports = mongoose.model('videosPage', videosSchema);  