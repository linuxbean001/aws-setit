const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const activitylogSchema = new Schema({
    userid:String,
    name: String,
    action: String,
    datetime: String,
    activitydata:String
});
module.exports = mongoose.model('Activitylog', activitylogSchema);  