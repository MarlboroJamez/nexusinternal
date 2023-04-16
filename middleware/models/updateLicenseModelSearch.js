const LicenseModel = require('../../models/license/License');
const updateLicenseModelSearch = async (license, restrictionName, restrictCost) => {
  try {
    if (restrictionName === "Lifestyle Audit Report" || restrictionName === "Dynamic Report") {
      await LicenseModel.updateMany(
        { 
          name: license.name, 
          'restrictions.type': { $in: [ "Lifestyle Audit Report", "Dynamic Report" ] } 
        },
        {
          $inc: {
            totalSearches: -1,
            totalIncome: -parseInt(restrictCost),
            'restrictions.$[elem].searches': -1,
            'restrictions.$[elem].total': -parseInt(restrictCost),
          },
        },
        {
          arrayFilters: [ { "elem.type": { $in: [ "Lifestyle Audit Report", "Dynamic Report" ] } } ]
        }
      );
    } else if (restrictionName === "Commercial Enquiry" || restrictionName === "Procurement Enquiry"){
      await LicenseModel.updateMany(
        { 
          name: license.name, 
          'restrictions.type': { $in: [ "Commercial Enquiry", "Procurement Enquiry" ] } 
        },
        {
          $inc: {
            totalSearches: -1,
            totalIncome: -parseInt(restrictCost),
            'restrictions.$[elem].searches': -1,
            'restrictions.$[elem].total': -parseInt(restrictCost),
          },
        },
        {
          arrayFilters: [ { "elem.type": { $in: [ "Commercial Enquiry", "Procurement Enquiry" ] } } ]
        }
      );
    } else if (restrictionName === "IDV Listing including photo" || restrictionName === "IDV Listing without photo"){
      await LicenseModel.updateMany(
        { 
          name: license.name, 
          'restrictions.type': { $in: [ "IDV Listing including photo", "IDV Listing without photo" ] } 
        },
        {
          $inc: {
            totalSearches: -1,
            totalIncome: -parseInt(restrictCost),
            'restrictions.$[elem].searches': -1,
            'restrictions.$[elem].total': -parseInt(restrictCost),
          },
        },
        {
          arrayFilters: [ { "elem.type": { $in: [ "IDV Listing including photo", "IDV Listing without photo" ] } } ]
        }
      );
    } else {
      await LicenseModel.updateOne(
        { name: license.name, 'restrictions.type': restrictionName.toString() },
        {
          $inc: {
            totalSearches: -1,
            totalIncome: -parseInt(restrictCost),
            'restrictions.$.searches': -1,
            'restrictions.$.total': -parseInt(restrictCost),
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    throw new Error('Failed to update license model');
  }
};


module.exports = updateLicenseModelSearch;
