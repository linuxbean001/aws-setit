const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const researchSchema = new Schema({
    title:String,
    description:String,
    files:String,
    links:String
});
module.exports = mongoose.model('Research', researchSchema);   