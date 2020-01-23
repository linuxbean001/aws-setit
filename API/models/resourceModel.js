const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const resourceSchema = new Schema({
    title:String,
    description:String,
    files:String,
    links:String
});
module.exports = mongoose.model('Resource', resourceSchema);   