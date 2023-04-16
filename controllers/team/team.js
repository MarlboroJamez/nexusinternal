const UserModal = require('../../models/users/Users');
const SearchModal = require('../../models/cpb/Searches');

exports.getteammembers = async(req, res, next) => {
    const {pid} = req.body;

    try {
        const members = await UserModal.find({'license._id': pid}).sort();

        res.status(201).json({
            success: true,
            data: members,
        });
    } catch (err) {
        console.log(err)
    }
}

exports.searchteammembers = async(req, res, next) => {
    const {pid, search, uid} = req.body;

    const keyword = search
    ? {
        $or: [
            {
                name: { 
                    $regex: search, 
                    $options: 'i'
                }
            },
            {
                surname: {
                    $regex: search, 
                    $options: 'i'
                }
            },
            {
                email: {
                    $regex: search, 
                    $options: 'i'
                }
            }
        ]
    }:{};

    try {
        const members = await UserModal.find({'package._id': pid}).find(keyword).find({_id: {$ne: uid}}).sort();

        res.status(201).json({
            success: true,
            data: members,
        });
    } catch (err) {
        console.log(err)
    }
}

exports.memberinformation = async (req, res, next) => {
    const {uid} = req.body;

    try {
        const searches = await SearchModal.find({uid: uid});
        const member = await UserModal.find({_id: uid});

        res.status(200).send({
            success: true,
            member: member,
            searches: searches
        })
    } catch (err) {
        res.status(500).send({
            success: false,
        });
    }
}

exports.updatepermissions = async (req, res, next) => { 
    const {
        uid,
        accessibility,
        isTeamAdmin, 
        isExport,
        isReporting,
        isDirectory,
        isAnalysis,
        isActivity,
        isScheduled,
        isRegular,
        accessStatus
    } = req.body; 

    try {
        const teamAdmin = await UserModal.updateOne({_id: uid},
            {
                $set: {
                    isTeamAdmin: isTeamAdmin,
                    isExport: isExport,
                    isReporting: isReporting,
                    isDirectory: isDirectory,
                    isAnalysis: isAnalysis,
                    isActivity: isActivity,
                    isScheduled: isScheduled,
                    isRegular: isRegular,
                    isActivity: isActivity,
                    accessibility: accessibility
                }
            }
        );
        const keys = Object.keys(accessStatus);
if (keys.length > 0) {
  const updateObject = {};
  const arrayFilters = [];

  keys.forEach((type, index) => {
    const identifier = `type_${type.replace(/\s+/g, '')}`;
    updateObject[`license.$[].restrictions.$[elem].access`] = accessStatus[type];
    arrayFilters.push({ [`${identifier}`]: type.replace(/\s+/g, '') });
  });

  await UserModal.updateMany(
    { _id: uid },
    { $set: updateObject },
    {
      arrayFilters: [{ 'elem.type': { $in: keys } }, ...arrayFilters],
      multi: true,
      strict: false, // add this option to disable schema validation
    }
  );
} 

        res.status(200).send({
            success: true,
            message: 'Updated successfully.',
            data: teamAdmin
        })
    } catch(err){
        console.log(err)
        res.status(200).send({
            success: true,
            message: err.response
        })
    }
}