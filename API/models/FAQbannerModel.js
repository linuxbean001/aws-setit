const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const FAQbannerSchema = new Schema({
    title:String,
    content:String,
    image:String,
    datetime: String 
});
module.exports = mongoose.model('faqbanner_tbl', FAQbannerSchema);  