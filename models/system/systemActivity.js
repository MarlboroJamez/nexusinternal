const mongoose = require('mongoose');

const SystemActivitySchema = new mongoose.Schema({
    creation: Date,
    type: String,
    action: String,
    endpoint: String,
    role: String,
    uid: String,
    meta: Array,
});

SystemActivitySchema.pre('save', function(next){
    this.creation = Date.now();
    next();
});

const SystemActivity = mongoose.model("system-activity", SystemActivitySchema);

module.exports = SystemActivity;