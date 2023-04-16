const mongoose = require('mongoose');

const SupportSchema = new mongoose.Schema({
    uid: {type: String},
    email: {type: String},
    priority: {type: String},
    message: {type: String},
    creation: {type: Date}
});

SupportSchema.pre('save', function(next){
    this.creation = Date.now();
    next();
});

const Support = mongoose.model("support", SupportSchema);

module.exports = Support;