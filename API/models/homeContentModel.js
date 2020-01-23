const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const WhocanuseitSchema = new Schema({
    title:String,
    content:String,
    image:String,
    option:String,
    datetime: String 

});
module.exports = mongoose.model('homecontent_tbl', WhocanuseitSchema);  