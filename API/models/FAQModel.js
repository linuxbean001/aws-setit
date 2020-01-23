const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const FAQSchema = new Schema({
    title:String,
    content:String,
    datetime: String

});
module.exports = mongoose.model('faq_tbl', FAQSchema);  