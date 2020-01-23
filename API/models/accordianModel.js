const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AccordianSchema = new Schema({
    title:String,
    content:String,
    datetime: String
});
module.exports = mongoose.model('trad_accordian', AccordianSchema);  