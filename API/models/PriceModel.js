const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PriceSchema = new Schema({
    title:String,
    content:String,
    datetime: String

});
module.exports = mongoose.model('price_tbl', PriceSchema);  