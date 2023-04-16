// Models
const CPBSearchModel = require('../../models/cpb/Searches');

const createSearchModel = async (pid, project, title, uid, name, header, share, surname, restrictCost, currentTotal, PermissiblePurpose, search) => {
  try {
    await CPBSearchModel.create({
      uid,
      name,
      header,
      share,
      surname,
      pid,
      project: project,
      title: title,
      cost: restrictCost,
      remaining: currentTotal,
      purpose: PermissiblePurpose,
      search,
    });
  } catch (err) {
    console.error(err);
    throw new Error('Failed to create search model');
  }
};

module.exports = createSearchModel;
