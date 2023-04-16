const mongoose = require('mongoose');

const CPBSearchSchema = new mongoose.Schema({
    uid: {type: String},
    header: {type: String},
    share: {type: Boolean},
    name: {type: String},
    surname: {type: String},
    pid: {type: String},
    project: {type: String},
    title: {type: String},
    purpose: {type: String},
    creation: {type: Date},
    cost: {type: String},
    scheduled: {type: Boolean},
    sdate: {type: Date},
    remaining: {type: String},
    search: []
});

CPBSearchSchema.pre('save', function(next){
    this.creation = Date.now();
    next();
});

const CPBSearches = mongoose.model("cpbsearches", CPBSearchSchema);

module.exports = CPBSearches;