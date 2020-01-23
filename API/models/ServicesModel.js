const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ServicesSchema = new Schema({
    title:String,
    content:String,
    shortcontent:String,
    datetime: String

});
module.exports = mongoose.model('services_tbl', ServicesSchema);  