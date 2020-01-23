const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const regSchema = new Schema({
    name:String,
    email: String,
    password: String,
    investor:String,
    financial:String,
    professor:String,
    tell_us_more:String,
    role:String,
    datetime:String,
    tool_enabled:Boolean,
    number_of_signins:Number,
    last_uses_date:String,
    presetemail:String,
    presetlink:String,
    signup_status:Boolean
});
module.exports = mongoose.model('Register', regSchema);  