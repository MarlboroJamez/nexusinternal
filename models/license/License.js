const mongoose = require('mongoose');

const LicenseSchema = new mongoose.Schema({
    name: {type: String},
    customer: {type: String},
    creation: {type: Date,},
    provider: {type: String},
    totalIncome: {type: Number},
    totalSearches: {type: Number},
    restrictions: [],
});

LicenseSchema.pre('save', function(next){
    this.creation = Date.now();
    next();
});

const Licenses = mongoose.model("licences", LicenseSchema);

module.exports = Licenses;