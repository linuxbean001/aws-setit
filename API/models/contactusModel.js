const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const contactSchema = new Schema({
    name:String,
    email: String,
    message: String,
    hireyou: String,
    question: String,
    feedback: String,
    businesssynergy: String,
    other: String,
    datetime: String,
    userid: String

});
module.exports = mongoose.model('Contactus', contactSchema);  