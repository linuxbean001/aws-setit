const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TableRowSchema = new Schema({
    title:String,
    swr:String,
    va:String,
    datetime: String
});
module.exports = mongoose.model('trad_tablerow', TableRowSchema);  