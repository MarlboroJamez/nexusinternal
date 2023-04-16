
const UserModal = require('../../models/users/Users');
const SystemActivityModal = require('../../models/system/systemActivity');
const SearchModal = require('../../models/cpb/Searches');
const ProjectModal = require('../../models/projects/Projects');
const LicenseModal = require('../../models/license/License');

exports.getdashboardinformation = async (req, res, next) => {
    const {uid, pid, meta} = req.body;

      
  const log = [
    {
      uid: uid,
      type: 'GET',
      role: 'member',
      action: 'get client searches',
      endpoint: '/client/seaches',
      meta: []
    },
    {
        uid: uid,
        type: 'GET',
        role: 'member',
        action: 'get my projects',
        endpoint: '/client/seaches',
        meta: []
    },
    {
        uid: uid,
        type: 'GET',
        role: 'member',
        action: 'get team projects',
        endpoint: '/client/seaches',
        meta: []
    },
    {
        uid: uid,
        type: 'GET',
        role: 'member',
        action: 'get client logs',
        endpoint: `/logs/get`,
        meta: []
    },
  ]

    try {
        await SystemActivityModal.create(log);

        const searches = await SearchModal.find({uid: uid});
        const teamprojects = await SearchModal.find({pid: pid}).sort();
        const clientprojects = await ProjectModal.find({uid: uid}).sort();
        const logs =  await SystemActivityModal.find({uid: uid});
        const members = await UserModal.find({'license._id': pid}).sort();
        
        res.status(200).send({
            success: true,
            searches: searches,
            teamprojects: teamprojects,
            members: members,
            clientprojects: clientprojects,
            logs: logs
        });
    } catch(err) { 
        res.status(500).send({
            success: false,
        });
    }
}


exports.getsearchinformation = async (req, res, next) => {
    const {uid} = req.body;

    try {
        const projects = await ProjectModal.find({uid: uid}).sort();
        const searches = await SearchModal.find({uid: uid});

        res.status(200).send({
            success: true,
            projects: projects,
            searches: searches,
        });
    } catch(err){
        console.log(err)
    }
}

exports.getlicenseforsearch = async (req, res, next) => {
    const {id} = req.body;

    try {
        const license = await LicenseModal.find({_id: id}).sort();

        res.status(200).send({
            success: true,
            data: license,
        });
    } catch(err){
        console.log(err)
    }

}