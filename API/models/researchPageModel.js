const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const researchSchema = new Schema({
    title:String,
    content:String,
    section:String
});
module.exports = mongoose.model('ResearchPage', researchSchema);   