const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ServiceSolutionSchema = new Schema({
    ftitle:String,
    fcontent:String,
    stitle:String,
    scontent:String,
    sectiontitle:String,
    datetime: String 
});
module.exports = mongoose.model('servicesolution_tbl', ServiceSolutionSchema);  