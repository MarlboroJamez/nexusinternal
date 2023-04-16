const mongoose = require('mongoose');

const ProjectsSchema = new mongoose.Schema({
    uid: {type: String},
    uname: {type: String},
    share: {type: Boolean},
    usurname: {type: String},
    name: {type: String},
    description: {type: String},
    startDate: {type: Date},
    endDate: {type: Date},
    priorityLevel: {type: String},
    reports: [],
    searches: [],
    members: [],
    license: [],
    package: [],
    creation: {type: Date}
});

ProjectsSchema.pre('save', function(next){
    this.creation = Date.now();
    next();
});

const Project = mongoose.model("projects", ProjectsSchema);

module.exports = Project;