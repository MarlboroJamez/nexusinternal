//MODELS
const ProjectModal = require('../../models/projects/Projects');

exports.createproject = async (req, res, next) => {
    const {uid, share, name, description, members, license, packages, uname, usurname, priorityLevel, startDate, endDate} = req.body;

    try {
        const project = await ProjectModal.create({
            uid: uid,
            share: share,
            name: name,
            uname: uname,
            usurname: usurname,
            priorityLevel: priorityLevel,
            startDate: startDate,
            endDate: endDate,
            description: description,
            members: members,
            license: license,
            package: packages,
        });

        res.status(201).json({
            success: true,
            message: "Package has been created successfully.",
            data: project
        });
    } catch (err) {
        console.log(err)
    }
}

exports.getprojects = async (req, res, next) => {
    const {uid} = req.body;

    try {
        const data = await ProjectModal.find({uid: uid}).sort();

        res.status(200).send({
            success: true,
            data: data
        });

    } catch (err) {
        console.log(err)
    }
}

exports.getteamprojects = async (req, res, next) => {
    const {pid} = req.body;

    try {
        const projects = await ProjectModal.find({'package._id': pid, 'share': true}).sort();
        
        res.status(200).send({
            success: true,
            data: projects
        });
    } catch(err){
        console.log(err)
    }
}

exports.getsharedprojects = async (req, res, next) => {
    const {pid} = req.body;

    try {
        const projects = await ProjectModal.find({'package._id': pid, share: true}).sort();
        
        res.status(200).send({
            success: true,
            data: projects
        });
    } catch(err){
        console.log(err)
    }
}

exports.updatePorject = async (req, res, next) => {
    const {uid, name, share, description, members, license, packages, uname, usurname, priorityLevel, startDate, endDate} = req.body;

    try {
        const projects = await ProjectModal.updateOne({_id: uid},
            {
                $set: {
                    share: share,
                    name: name,
                    uname: uname,
                    usurname: usurname,
                    priorityLevel: priorityLevel,
                    startDate: startDate,
                    endDate: endDate,
                    description: description,
                    members: members,
                    license: license,
                    package: packages,
                }
            }
        );

        res.status(200).send({
            success: true,
            data: projects
        });
    } catch(err) {
        console.log(err)
    }
}

exports.deleteproject = async (req, res, next) => {
    const {pid} = req.body;

    try {
        await ProjectModal.deleteOne({_id: pid});
        res.status(201).json({
            success: true,
            data: "Project has been successfully deleted."
        });
    } catch(err) {
        console.log(err)
    }
}