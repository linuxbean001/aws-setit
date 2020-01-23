const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const EICSchema = new Schema({
    title:String,
    content:String,
    image:String,
    datetime: String

});
module.exports = mongoose.model('eic_tbl', EICSchema);  