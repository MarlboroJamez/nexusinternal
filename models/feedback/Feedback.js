const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
    uid: {type: String},
    email: {type: String},
    message: {type: String},
    creation: {type: Date}
});

FeedbackSchema.pre('save', function(next){
    this.creation = Date.now();
    next();
});

const Feedback = mongoose.model("feedback", FeedbackSchema);

module.exports = Feedback;