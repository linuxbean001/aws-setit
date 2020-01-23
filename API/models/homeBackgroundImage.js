const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const HomeBGimageSchema = new Schema({
    option:String,
    bgimage:Array,
    datetime: String

});
module.exports = mongoose.model('backgroundimage_tbl', HomeBGimageSchema);  