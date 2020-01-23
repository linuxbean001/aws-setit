const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const sliderSchema = new Schema({
    slidertitle:String,
    sliderimage:String,
    datetime: String

});
module.exports = mongoose.model('slider', sliderSchema);  