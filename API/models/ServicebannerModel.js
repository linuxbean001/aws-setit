const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ServicebannerSchema = new Schema({
    title:String,
    content:String,
    footercontent:String,
    image:String,
    datetime: String 
});
module.exports = mongoose.model('servicebanner_tbl', ServicebannerSchema);  