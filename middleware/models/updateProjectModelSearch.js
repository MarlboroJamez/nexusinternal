const ProjectModel = require('../../models/projects/Projects');

const updateProjectModelSearch = async (restrictCost, uid, name, surname, header, pid, project, title, PermissiblePurpose, share, currentTotal, search) => {
    try {
        await ProjectModel.updateOne({_id: pid, 'license.0.restrictions.type': title.toString()}, {
            '$inc':{ 
                'license.0.totalSearches':  - 1,
                'license.0.totalIncome': - parseInt(restrictCost),
                'license.0.restrictions.$.searches': -1,
                'license.0.restrictions.$.total': - parseInt(restrictCost)
            },
            '$push': {
                'searches': {
                    uid: uid,
                    name: name,
                    surname: surname,
                    header: header,
                    pid: pid,
                    project: project,
                    title: title,
                    purpose: PermissiblePurpose,
                    share: share,
                    cost: restrictCost,
                    remaining: currentTotal,
                    search: search
                }
            } 
        });
        console.log('ProjectModel updated successfully');
    } catch (error) {
        console.error('Error updating ProjectModel: ', error);
        throw new Error('Error updating ProjectModel');
    }
}

module.exports = updateProjectModelSearch;
