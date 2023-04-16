const mongoose = require('mongoose');

const ScheduleSearch = new mongoose.Schema({
    user: { type: String },
    jobs: { type: String },
    codeStatus: { type: String},
    date: Date,
    status: {type: Boolean},
    parameters: {type: Object},
    creation: Date,
});

ScheduleSearch.pre('save', function(next){
    this.creation = Date.now();
    next();
});

const SSearch = mongoose.model("cpbscheduled", ScheduleSearch);

module.exports = SSearch;