const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const traditionalSchema = new Schema({
    title:String,
    content:String,
    section:String
});
module.exports = mongoose.model('sialiPage', traditionalSchema);  