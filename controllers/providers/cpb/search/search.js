const axios = require('axios');

// Models
const SearchModel = require('../../../../models/cpb/Searches');

// Middleware
const createSearchModel = require('../../../../middleware/models/createSearchModel');
const updateProjectModelSearch = require('../../../../middleware/models/updateProjectModelSearch');
const updateLicenseModelSearch = require('../../../../middleware/models/updateLicenseModelSearch');


/**
 * Controller function to search for a list of people using a third-party API.
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} next - Express next function
 * @returns {Promise<void>}
 */
exports.getallsearches = async (req, res, next) => {
  const {uid} = req.body;

  try {
    const data = await SearchModel.find({uid: uid});

    res.status(200).send({
      success: true,
      data: data
    })
  } catch (err) {
    console.log(err)
    res.status(500).send({
      success: false,
      message: "We could not fetch your searches, if this keeps persisting contact us at nexusintel@nexfor.co.za"
    })
  }
}

/**
 * Controller function to search for a list of people using a third-party API.
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} next - Express next function
 * @returns {Promise<void>}
 */
exports.peoplelist = async (req, res, next) => {
  // Extract the auth token from the request object.
  const token = req.authToken;

  const uid = req.body.uid; // Define and initialize uid variable
  const name = req.body.name; // Define and initialize name variable
  const header = req.body.header; // Define and initialize header variable
  const share = req.body.share; // Define and initialize share variable
  const surname = req.body.surname; // Define and initialize surname variable
  const restrictCost = req.body.restrictCost; // Define and initialize restrictCost variable
  const currentTotal = req.body.currentTotal; // Define and initialize currentTotal variable
  const project = req.body.project; // Define and initialize PermissiblePurpose variable
  const title = req.body.restrictionName; // Define and initialize PermissiblePurpose variable
  const PermissiblePurpose = req.body.permissiblePurpose; // Define and initialize PermissiblePurpose
  const pid = req.body.pid // Define and initialize pid
  const license = req.body.license; // Define and initialize license
  const userEmail = req.body.userEmail; // Define and initialize userEmail

  const info = {
    Token: token,
    PermissiblePurpose: req.body.PermissiblePurpose,
    IDNumber: req.body.IDNumber,
    Surname: req.body.Surname,
    FirstName: req.body.FirstName,
    SecondName: req.body.SecondName,
    DOB: req.body.DOB,
    UsePP: req.body.UsePP,
    UseDHAExtra: '',
    Reference: req.body.Reference,
  };

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const search = await axios.post(
      `${process.env.CPB_USER_TEST_URL}/people/list?verify=${process.env.CPB_TEST_VERIFY}`,
      info,
      config
    );

    if(pid && search.status === 200){
      // Creating the search model
      createSearchModel(pid, project, title, uid, name, header, share, surname, restrictCost, currentTotal, PermissiblePurpose, search.data)
      //updateProjectModelSearch(restrictCost, uid, name, surname, header, pid, project, title, PermissiblePurpose, share, currentTotal)
      updateLicenseModelSearch(license, title, restrictCost)
      
      // await axios.post('/api/v1/exchange/send',{
      //   email: userEmail,
      //   from: `${name} ${surname}`,
      //   subject: 'Person Listing',
      //   message: 'Your Person Listing search has been successful.'
      // },config);

      res.status(200).send({
        success: true,
        message: "Your search has been conducted successfully, remeber to have a look at your incoming searches."
      })
    } else {
      return res.status(500).send({
        success: false,
        message: "Please make sure a project is selected before a search is done"
      });
    }
  } catch (err) {
    console.log(err)
    return res.status(500).send({
      success: false,
      message: 'Failed to conduct your search, please try again later, or get hold of our support team at nexusintelsupport@nexfor.co.za'
    });
  }
};


/**
 * Controller function to search for a list of people using a third-party API.
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} next - Express next function
 * @returns {Promise<void>}
 */
exports.eagleEyeSearch = async (req, res, next) => {
  // Extract the auth token from the request object.
  const token = req.authToken;

  const uid = req.body.uid; // Define and initialize uid variable
  const name = req.body.name; // Define and initialize name variable
  const header = req.body.header; // Define and initialize header variable
  const share = req.body.share; // Define and initialize share variable
  const surname = req.body.surname; // Define and initialize surname variable
  const restrictCost = req.body.restrictCost; // Define and initialize restrictCost variable
  const currentTotal = req.body.currentTotal; // Define and initialize currentTotal variable
  const project = req.body.project; // Define and initialize PermissiblePurpose variable
  const title = req.body.restrictionName; // Define and initialize PermissiblePurpose variable
  const PermissiblePurpose = req.body.permissiblePurpose; // Define and initialize PermissiblePurpose
  const pid = req.body.pid // Define and initialize pid
  const license = req.body.license; // Define and initialize license
  const userEmail = req.body.userEmail; // Define and initialize userEmail
  const EnquiryReason = req.body.EnquiryReason;
  const InputSurname = req.body.InputSurname;
  const InputSecondname = req.body.InputSecondname;
  const InputFirstName = req.body.InputFirstName;
  const Reference = req.body.Reference;
  const IDNumber = req.body.IDNumber; // Define and initialize userEmail


  const info = {
    Token: token,
    PermissiblePurpose: PermissiblePurpose,
    IDNumber: IDNumber,
    Reference: Reference,
    InputFirstName: InputFirstName,
    InputSecondname: InputSecondname,
    InputSurname: InputSurname,
    EnquiryReason: EnquiryReason
  } 

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const search = await axios.post(
      `${process.env.CPB_USER_TEST_URL}/wrapper/eagleeye?verify=${process.env.CPB_TEST_VERIFY}`,
      info,
      config
    );

    if(pid && search.status === 200){
      // Creating the search model
      createSearchModel(pid, project, title, uid, name, header, share, surname, restrictCost, currentTotal, PermissiblePurpose, search.data)
      //updateProjectModelSearch(restrictCost, uid, name, surname, header, pid, project, title, PermissiblePurpose, share, currentTotal)
      updateLicenseModelSearch(license, title, restrictCost)
      
      // await axios.post('/api/v1/exchange/send',{
      //   email: userEmail,
      //   from: `${name} ${surname}`,
      //   subject: 'Person Listing',
      //   message: 'Your Person Listing search has been successful.'
      // },config);

      res.status(200).send({
        success: true,
        message: "Your search has been conducted successfully, remeber to have a look at your incoming searches."
      })
    } else {
      return res.status(500).send({
        success: false,
        message: "Please make sure a project is selected before a search is done"
      });
    }
  } catch (err) {
    console.log(err)
    return res.status(500).send({
      success: false,
      message: 'Failed to conduct your search, please try again later, or get hold of our support team at nexusintelsupport@nexfor.co.za'
    });
  }
};

/**
 * Controller function to search for a list of people using a third-party API.
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} next - Express next function
 * @returns {Promise<void>}
 */
exports.proofofaddress = async (req, res, next) => {
  // Extract the auth token from the request object.
  const token = req.authToken;

  const uid = req.body.uid; // Define and initialize uid variable
  const name = req.body.name; // Define and initialize name variable
  const header = req.body.header; // Define and initialize header variable
  const share = req.body.share; // Define and initialize share variable
  const surname = req.body.surname; // Define and initialize surname variable
  const restrictCost = req.body.restrictCost; // Define and initialize restrictCost variable
  const currentTotal = req.body.currentTotal; // Define and initialize currentTotal variable
  const project = req.body.project; // Define and initialize PermissiblePurpose variable
  const title = req.body.restrictionName; // Define and initialize PermissiblePurpose variable
  const PermissiblePurpose = req.body.permissiblePurpose; // Define and initialize PermissiblePurpose
  const pid = req.body.pid // Define and initialize pid
  const license = req.body.license; // Define and initialize license
  const userEmail = req.body.userEmail; // Define and initialize userEmail
  const Reference = req.body.Reference; // Define and initialize userEmail
  const IDNumber = req.body.IDNumber; // Define and initialize userEmail


  const info = {
    Token: token,
    PermissiblePurpose: PermissiblePurpose,
    IDNumber: IDNumber,
    Reference: Reference,
  } 

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const search = await axios.post(
      `${process.env.CPB_USER_TEST_URL}/wrapper/proofofaddress?verify=${process.env.CPB_TEST_VERIFY}`,
      info,
      config
    );

    if(pid && search.status === 200){
      // Creating the search model
      createSearchModel(pid, project, title, uid, name, header, share, surname, restrictCost, currentTotal, PermissiblePurpose, search.data)
      //updateProjectModelSearch(restrictCost, uid, name, surname, header, pid, project, title, PermissiblePurpose, share, currentTotal)
      updateLicenseModelSearch(license, title, restrictCost)
      
      // await axios.post('/api/v1/exchange/send',{
      //   email: userEmail,
      //   from: `${name} ${surname}`,
      //   subject: 'Person Listing',
      //   message: 'Your Person Listing search has been successful.'
      // },config);

      res.status(200).send({
        success: true,
        message: "Your search has been conducted successfully, remeber to have a look at your incoming searches."
      })
    } else {
      return res.status(500).send({
        success: false,
        message: "Please make sure a project is selected before a search is done"
      });
    }
  } catch (err) {
    console.log(err)
    return res.status(500).send({
      success: false,
      message: 'Failed to conduct your search, please try again later, or get hold of our support team at nexusintelsupport@nexfor.co.za'
    });
  }
};


/**
 * Controller function to search for a list of people using a third-party API.
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} next - Express next function
 * @returns {Promise<void>}
 */
exports.lifestyleauditreport = async (req, res, next) => {
  // Extract the auth token from the request object.
  const token = req.authToken;

  const uid = req.body.uid; // Define and initialize uid variable
  const name = req.body.name; // Define and initialize name variable
  const header = req.body.header; // Define and initialize header variable
  const share = req.body.share; // Define and initialize share variable
  const surname = req.body.surname; // Define and initialize surname variable
  const restrictCost = req.body.restrictCost; // Define and initialize restrictCost variable
  const currentTotal = req.body.currentTotal; // Define and initialize currentTotal variable
  const project = req.body.project; // Define and initialize PermissiblePurpose variable
  const title = req.body.restrictionName; // Define and initialize PermissiblePurpose variable
  const PermissiblePurpose = req.body.PermissiblePurpose; // Define and initialize PermissiblePurpose
  const pid = req.body.pid // Define and initialize pid
  const license = req.body.license; // Define and initialize license
  const userEmail = req.body.userEmail; // Define and initialize userEmail
  const Reference = req.body.Reference; // Define and initialize userEmail
  const EnquiryDoneBy = req.body.EnquiryDoneBy; // Define and initialize userEmail
  const EnquiryReason = req.body.EnquiryReason; // Define and initialize userEmail
  const InputPerson = req.body.InputPerson; // Define and initialize userEmail
  const InputAddress = req.body.InputAddress; // Define and initialize userEmail
  const IDNumber = req.body.IDNumber; // Define and initialize userEmail


  const info = {
    Token:token,
    PermissiblePurpose: PermissiblePurpose,
    IDNumber: IDNumber,
    Reference: Reference,
    EnquiryDoneBy: EnquiryDoneBy,
    UseDHAExtra: "",
    UseSAFPSDirect: "",
    EnquiryReason: PermissiblePurpose,
    TemplateID: "",
    RawHTML: ""
  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const search = await axios.post(
      `${process.env.CPB_USER_TEST_URL}/wrapper/lifestyleauditreport?verify=${process.env.CPB_TEST_VERIFY}`,
      info,
      config
    );

    if(pid && search.status === 200){
      // Creating the search model
      createSearchModel(pid, project, title, uid, name, header, share, surname, restrictCost, currentTotal, PermissiblePurpose, search.data)
      //updateProjectModelSearch(restrictCost, uid, name, surname, header, pid, project, title, PermissiblePurpose, share, currentTotal, search.data)
      updateLicenseModelSearch(license, title, restrictCost)
      
      await axios.post('http://localhost:5000/api/v1/exchange/send',{
        email: userEmail,
        from: `${name} ${surname}`,
        subject: 'Lifestyle Audit Report',
        encodedPDF: search.data.EncodedPDF,
        message: 'Your Lifestyle Audit Report search was a success. Your search may be viewed in the Nexus Intelligence dashboard, where you may also explore other features at your Incoming Searches.'
      },config);

      res.status(200).send({
        success: true,
        message: "Your search has been conducted successfully, remeber to have a look at your incoming searches."
      })
    } else {
      return res.status(500).send({
        success: false,
        message: "Please make sure a project is selected before a search is done"
      });
    }
  } catch (err) {
    console.log(err);
    if (err.response && err.response.data) {
      // The request was made and the server responded with a status code
      return res.status(500).send({
        success: false,
        message: err.response.data
      });
    } else if (err.request) {
      // The request was made but no response was received
      return res.status(500).send({
        success: false,
        message: 'No response received from server'
      });
    } else {
      // Something else happened in making the request that triggered the error
      return res.status(500).send({
        success: false,
        message: err
      });
    }
  }
};



/**
 * Controller function to search for a list of people using a third-party API.
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} next - Express next function
 * @returns {Promise<void>}
 */
exports.identityverification = async (req, res, next) => {
  // Extract the auth token from the request object.
  const token = req.authToken;

  const uid = req.body.uid; // Define and initialize uid variable
  const name = req.body.name; // Define and initialize name variable
  const header = req.body.header; // Define and initialize header variable
  const share = req.body.share; // Define and initialize share variable
  const surname = req.body.surname; // Define and initialize surname variable
  const restrictCost = req.body.restrictCost; // Define and initialize restrictCost variable
  const currentTotal = req.body.currentTotal; // Define and initialize currentTotal variable
  const project = req.body.project; // Define and initialize PermissiblePurpose variable
  const title = req.body.restrictionName; // Define and initialize PermissiblePurpose variable
  const PermissiblePurpose = req.body.permissiblePurpose; // Define and initialize PermissiblePurpose
  const pid = req.body.pid // Define and initialize pid
  const license = req.body.license; // Define and initialize license
  const userEmail = req.body.userEmail; // Define and initialize userEmail
  const Reference = req.body.Reference; // Define and initialize userEmail
  const EnquiryType = req.body.EnquiryType; // Define and initialize userEmail
  const EnquiryReason = req.body.EnquiryReason; // Define and initialize userEmail
  const SortBy = req.body.InputPerson; // Define and initialize userEmail
  const MaxRow = req.body.InputAddress; // Define and initialize userEmail
  const hasConsent = req.body.hasConsent; // Define and initialize userEmail
  const IDNumber = req.body.IDNumber; // Define and initialize userEmail


  const info = {
    Token: token,
    PermissiblePurpose: PermissiblePurpose,
    IDNumber: IDNumber,
    Reference: Reference,
    hasConsent: hasConsent,
    EnquiryReason: EnquiryReason,
    EnquiryType: EnquiryType,
    SortBy: SortBy,
    MaxRow: MaxRow
  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const search = await axios.post(
      `${process.env.CPB_USER_TEST_URL}/wrapper/idvlistpdf?verify=${process.env.CPB_TEST_VERIFY}`,
      info,
      config
    );

    if(pid && search.status === 200){
      // Creating the search model
      createSearchModel(pid, project, title, uid, name, header, share, surname, restrictCost, currentTotal, PermissiblePurpose, search.data)
      //updateProjectModelSearch(restrictCost, uid, name, surname, header, pid, project, title, PermissiblePurpose, share, currentTotal)
      updateLicenseModelSearch(license, title, restrictCost)
      
      // await axios.post('/api/v1/exchange/send',{
      //   email: userEmail,
      //   from: `${name} ${surname}`,
      //   subject: 'Person Listing',
      //   message: 'Your Person Listing search has been successful.'
      // },config);

      res.status(200).send({
        success: true,
        message: "Your search has been conducted successfully, remeber to have a look at your incoming searches."
      })
    } else {
      return res.status(500).send({
        success: false,
        message: "Please make sure a project is selected before a search is done"
      });
    }
  } catch (err) {
    console.log(err)
    return res.status(500).send({
      success: false,
      message: 'Failed to conduct your search, please try again later, or get hold of our support team at nexusintelsupport@nexfor.co.za'
    });
  }
};


/**
 * Controller function to search for a list of people using a third-party API.
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} next - Express next function
 * @returns {Promise<void>}
 */
exports.relativelinks = async (req, res, next) => {
  // Extract the auth token from the request object.
  const token = req.authToken;

  const uid = req.body.uid; // Define and initialize uid variable
  const name = req.body.name; // Define and initialize name variable
  const header = req.body.header; // Define and initialize header variable
  const share = req.body.share; // Define and initialize share variable
  const surname = req.body.surname; // Define and initialize surname variable
  const restrictCost = req.body.restrictCost; // Define and initialize restrictCost variable
  const currentTotal = req.body.currentTotal; // Define and initialize currentTotal variable
  const project = req.body.project; // Define and initialize PermissiblePurpose variable
  const title = req.body.restrictionName; // Define and initialize PermissiblePurpose variable
  const PermissiblePurpose = req.body.permissiblePurpose; // Define and initialize PermissiblePurpose
  const pid = req.body.pid // Define and initialize pid
  const license = req.body.license; // Define and initialize license
  const userEmail = req.body.userEmail; // Define and initialize userEmail
  const Reference = req.body.Reference; // Define and initialize userEmail
  const IDNumber = req.body.IDNumber; // Define and initialize userEmail


  const info = {
    Token:token,
    PermissiblePurpose: PermissiblePurpose,
    IDNumber: IDNumber,
    Reference: Reference,
  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const search = await axios.post(
      `${process.env.CPB_USER_TEST_URL}/relatives/list?verify=${process.env.CPB_TEST_VERIFY}`,
      info,
      config
    );

    if(pid && search.status === 200){
      // Creating the search model
      createSearchModel(pid, project, title, uid, name, header, share, surname, restrictCost, currentTotal, PermissiblePurpose, search.data)
      //updateProjectModelSearch(restrictCost, uid, name, surname, header, pid, project, title, PermissiblePurpose, share, currentTotal)
      updateLicenseModelSearch(license, title, restrictCost)
      
      // await axios.post('/api/v1/exchange/send',{
      //   email: userEmail,
      //   from: `${name} ${surname}`,
      //   subject: 'Person Listing',
      //   message: 'Your Person Listing search has been successful.'
      // },config);

      res.status(200).send({
        success: true,
        message: "Your search has been conducted successfully, remeber to have a look at your incoming searches."
      })
    } else {
      return res.status(500).send({
        success: false,
        message: "Please make sure a project is selected before a search is done"
      });
    }
  } catch (err) {
    console.log(err)
    return res.status(500).send({
      success: false,
      message: 'Failed to conduct your search, please try again later, or get hold of our support team at nexusintelsupport@nexfor.co.za'
    });
  }
};

/**
 * Controller function to search for a list of people using a third-party API.
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} next - Express next function
 * @returns {Promise<void>}
 */
exports.addresslist = async (req, res, next) => {
  // Extract the auth token from the request object.
  const token = req.authToken;

  const uid = req.body.uid; // Define and initialize uid variable
  const name = req.body.name; // Define and initialize name variable
  const header = req.body.header; // Define and initialize header variable
  const share = req.body.share; // Define and initialize share variable
  const surname = req.body.surname; // Define and initialize surname variable
  const restrictCost = req.body.restrictCost; // Define and initialize restrictCost variable
  const currentTotal = req.body.currentTotal; // Define and initialize currentTotal variable
  const project = req.body.project; // Define and initialize PermissiblePurpose variable
  const title = req.body.restrictionName; // Define and initialize PermissiblePurpose variable
  const PermissiblePurpose = req.body.PermissiblePurpose; // Define and initialize PermissiblePurpose
  const pid = req.body.pid // Define and initialize pid
  const license = req.body.license; // Define and initialize license
  const userEmail = req.body.userEmail; // Define and initialize userEmail
  const Reference = req.body.Reference; // Define and initialize userEmail
  const IDNumber = req.body.IDNumber; // Define and initialize userEmail


  const info = {
    Token:token,
    PermissiblePurpose: PermissiblePurpose,
    IDNumber: IDNumber,
    Reference: Reference,
    UseRankedScore: "true"
  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const search = await axios.post(
      `${process.env.CPB_USER_TEST_URL}/address/list?verify=${process.env.CPB_TEST_VERIFY}`,
      info,
      config
    );

    if(pid && search.status === 200){
      // Creating the search model
      createSearchModel(pid, project, title, uid, name, header, share, surname, restrictCost, currentTotal, PermissiblePurpose, search.data)
      //updateProjectModelSearch(restrictCost, uid, name, surname, header, pid, project, title, PermissiblePurpose, share, currentTotal)
      updateLicenseModelSearch(license, title, restrictCost)
      
      // await axios.post('/api/v1/exchange/send',{
      //   email: userEmail,
      //   from: `${name} ${surname}`,
      //   subject: 'Person Listing',
      //   message: 'Your Person Listing search has been successful.'
      // },config);

      res.status(200).send({
        success: true,
        message: "Your search has been conducted successfully, remeber to have a look at your incoming searches."
      })
    } else {
      return res.status(500).send({
        success: false,
        message: "Please make sure a project is selected before a search is done"
      });
    }
  } catch (err) {
    console.log(err)
    return res.status(500).send({
      success: false,
      message: 'Failed to conduct your search, please try again later, or get hold of our support team at nexusintelsupport@nexfor.co.za'
    });
  }
};

/**
 * Controller function to search for a list of people using a third-party API.
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} next - Express next function
 * @returns {Promise<void>}
 */
exports.telephonelist = async (req, res, next) => {
  // Extract the auth token from the request object.
  const token = req.authToken;

  const uid = req.body.uid; // Define and initialize uid variable
  const name = req.body.name; // Define and initialize name variable
  const header = req.body.header; // Define and initialize header variable
  const share = req.body.share; // Define and initialize share variable
  const surname = req.body.surname; // Define and initialize surname variable
  const restrictCost = req.body.restrictCost; // Define and initialize restrictCost variable
  const currentTotal = req.body.currentTotal; // Define and initialize currentTotal variable
  const project = req.body.project; // Define and initialize PermissiblePurpose variable
  const title = req.body.restrictionName; // Define and initialize PermissiblePurpose variable
  const PermissiblePurpose = req.body.permissiblePurpose; // Define and initialize PermissiblePurpose
  const pid = req.body.pid // Define and initialize pid
  const license = req.body.license; // Define and initialize license
  const userEmail = req.body.userEmail; // Define and initialize userEmail
  const AddNames = req.body.AddNames; // Define and initialize userEmail
  const ShowLinks = req.body.ShowLinks; // Define and initialize userEmail
  const GetOwnerName = req.body.GetOwnerName; // Define and initialize userEmail
  const Reference = req.body.Reference; // Define and initialize userEmail
  const IDNumber = req.body.IDNumber; // Define and initialize userEmail


  const info = {
    Token:token,
    PermissiblePurpose: PermissiblePurpose,
    IDNumber: IDNumber,
    AddNames: AddNames,
    GetOwnerName: GetOwnerName,
    ShowLinks: ShowLinks,
    Reference: Reference,
  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const search = await axios.post(
      `${process.env.CPB_USER_TEST_URL}/telephone/list?verify=${process.env.CPB_TEST_VERIFY}`,
      info,
      config
    );

    if(pid && search.status === 200){
      // Creating the search model
      createSearchModel(pid, project, title, uid, name, header, share, surname, restrictCost, currentTotal, PermissiblePurpose, search.data)
      //updateProjectModelSearch(restrictCost, uid, name, surname, header, pid, project, title, PermissiblePurpose, share, currentTotal)
      updateLicenseModelSearch(license, title, restrictCost)
      
      // await axios.post('/api/v1/exchange/send',{
      //   email: userEmail,
      //   from: `${name} ${surname}`,
      //   subject: 'Person Listing',
      //   message: 'Your Person Listing search has been successful.'
      // },config);

      res.status(200).send({
        success: true,
        message: "Your search has been conducted successfully, remeber to have a look at your incoming searches."
      })
    } else {
      return res.status(500).send({
        success: false,
        message: "Please make sure a project is selected before a search is done"
      });
    }
  } catch (err) {
    console.log(err)
    return res.status(500).send({
      success: false,
      message: 'Failed to conduct your search, please try again later, or get hold of our support team at nexusintelsupport@nexfor.co.za'
    });
  }
};

/**
 * Controller function to search for a list of people using a third-party API.
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} next - Express next function
 * @returns {Promise<void>}
 */
exports.emailaddresslist = async (req, res, next) => {
  // Extract the auth token from the request object.
  const token = req.authToken;

  const uid = req.body.uid; // Define and initialize uid variable
  const name = req.body.name; // Define and initialize name variable
  const header = req.body.header; // Define and initialize header variable
  const share = req.body.share; // Define and initialize share variable
  const surname = req.body.surname; // Define and initialize surname variable
  const restrictCost = req.body.restrictCost; // Define and initialize restrictCost variable
  const currentTotal = req.body.currentTotal; // Define and initialize currentTotal variable
  const project = req.body.project; // Define and initialize PermissiblePurpose variable
  const title = req.body.restrictionName; // Define and initialize PermissiblePurpose variable
  const PermissiblePurpose = req.body.permissiblePurpose; // Define and initialize PermissiblePurpose
  const pid = req.body.pid // Define and initialize pid
  const license = req.body.license; // Define and initialize license
  const EmailAddress = req.body.EmailAddress; // Define and initialize userEmail
  const Reference = req.body.Reference; // Define and initialize userEmail
  const IDNumber = req.body.IDNumber; // Define and initialize userEmail


  const info = {
    Token:token,
    PermissiblePurpose: PermissiblePurpose,
    IDNumber: IDNumber,
    EmailAddress: EmailAddress,
    Reference: Reference,
  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const search = await axios.post(
      `${process.env.CPB_USER_TEST_URL}/emailaddress/list?verify=${process.env.CPB_TEST_VERIFY}`,
      info,
      config
    );

    if(pid && search.status === 200){
      // Creating the search model
      createSearchModel(pid, project, title, uid, name, header, share, surname, restrictCost, currentTotal, PermissiblePurpose, search.data)
      //updateProjectModelSearch(restrictCost, uid, name, surname, header, pid, project, title, PermissiblePurpose, share, currentTotal)
      updateLicenseModelSearch(license, title, restrictCost)
      
      // await axios.post('/api/v1/exchange/send',{
      //   email: userEmail,
      //   from: `${name} ${surname}`,
      //   subject: 'Person Listing',
      //   message: 'Your Person Listing search has been successful.'
      // },config);

      res.status(200).send({
        success: true,
        message: "Your search has been conducted successfully, remeber to have a look at your incoming searches."
      })
    } else {
      return res.status(500).send({
        success: false,
        message: "Please make sure a project is selected before a search is done"
      });
    }
  } catch (err) {
    console.log(err)
    return res.status(500).send({
      success: false,
      message: 'Failed to conduct your search, please try again later, or get hold of our support team at nexusintelsupport@nexfor.co.za'
    });
  }
};


/**
 * Controller function to search for a list of people using a third-party API.
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} next - Express next function
 * @returns {Promise<void>}
 */
exports.cipcdirectorslist = async (req, res, next) => {
  // Extract the auth token from the request object.
  const token = req.authToken;

  const uid = req.body.uid; // Define and initialize uid variable
  const userEmail = req.body.userEmail; // Define and initialize userEmail
  const name = req.body.name; // Define and initialize name variable
  const header = req.body.header; // Define and initialize header variable
  const share = req.body.share; // Define and initialize share variable
  const surname = req.body.surname; // Define and initialize surname variable
  const restrictCost = req.body.restrictCost; // Define and initialize restrictCost variable
  const currentTotal = req.body.currentTotal; // Define and initialize currentTotal variable
  const project = req.body.project; // Define and initialize PermissiblePurpose variable
  const title = req.body.restrictionName; // Define and initialize PermissiblePurpose variable
  const PermissiblePurpose = req.body.PermissiblePurpose; // Define and initialize PermissiblePurpose
  const pid = req.body.pid // Define and initialize pid
  const license = req.body.license; // Define and initialize license
  const RegistrationNumber = req.body.RegistrationNumber; // Define and initialize userEmail
  const Reference = req.body.Reference; // Define and initialize userEmail
  const IDNumber = req.body.IDNumber; // Define and initialize userEmail


  const info = {
    Token:token,
    PermissiblePurpose: PermissiblePurpose,
    IDNumber: IDNumber,
    RegistrationNumber: RegistrationNumber,
    UseDHAExtra: "",
    Reference: Reference,
  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const search = await axios.post(
      `${process.env.CPB_USER_TEST_URL}/cipcdirectors/list?verify=${process.env.CPB_TEST_VERIFY}`,
      info,
      config
    );

    if(pid && search.status === 200){
      // Creating the search model
      createSearchModel(pid, project, title, uid, name, header, share, surname, restrictCost, currentTotal, PermissiblePurpose, search.data)
      //updateProjectModelSearch(restrictCost, uid, name, surname, header, pid, project, title, PermissiblePurpose, share, currentTotal, search.data)
      updateLicenseModelSearch(license, title, restrictCost)
      
      await axios.post('http://localhost:5000/api/v1/exchange/send',{
        email: userEmail,
        from: `${name} ${surname}`,
        subject: 'CIPC Director Listing',
        message: 'Your CIPC Director Listing search was a success. Your search may be viewed in the Nexus Intelligence dashboard, where you may also explore other features at your Incoming Searches.'
      },config);

      res.status(200).send({
        success: true,
        message: "Your search has been conducted successfully, remeber to have a look at your incoming searches."
      })
    } else {
      return res.status(500).send({
        success: false,
        message: "Please make sure a project is selected before a search is done"
      });
    }
  } catch (err) {
    console.log(err);
    if (err.response && err.response.data) {
      // The request was made and the server responded with a status code
      return res.status(500).send({
        success: false,
        message: err.response.data
      });
    } else if (err.request) {
      // The request was made but no response was received
      return res.status(500).send({
        success: false,
        message: 'No response received from server'
      });
    } else {
      // Something else happened in making the request that triggered the error
      return res.status(500).send({
        success: false,
        message: err
      });
    }
  }
};


/**
 * Controller function to search for a list of people using a third-party API.
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} next - Express next function
 * @returns {Promise<void>}
 */
exports.cipcauditorslist = async (req, res, next) => {
  // Extract the auth token from the request object.
  const token = req.authToken;

  const uid = req.body.uid; // Define and initialize uid variable
  const name = req.body.name; // Define and initialize name variable
  const header = req.body.header; // Define and initialize header variable
  const share = req.body.share; // Define and initialize share variable
  const surname = req.body.surname; // Define and initialize surname variable
  const restrictCost = req.body.restrictCost; // Define and initialize restrictCost variable
  const currentTotal = req.body.currentTotal; // Define and initialize currentTotal variable
  const project = req.body.project; // Define and initialize PermissiblePurpose variable
  const title = req.body.restrictionName; // Define and initialize PermissiblePurpose variable
  const PermissiblePurpose = req.body.PermissiblePurpose; // Define and initialize PermissiblePurpose
  const pid = req.body.pid // Define and initialize pid
  const license = req.body.license; // Define and initialize license
  const RegistrationNumber = req.body.RegistrationNumber; // Define and initialize userEmail
  const Reference = req.body.Reference; // Define and initialize userEmail


  const info = {
    Token:token,
    PermissiblePurpose: PermissiblePurpose,
    RegistrationNumber: RegistrationNumber,
    Reference: Reference,
  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const search = await axios.post(
      `${process.env.CPB_USER_TEST_URL}/cipcauditors/list?verify=${process.env.CPB_TEST_VERIFY}`,
      info,
      config
    );

    if(pid && search.status === 200){
      // Creating the search model
      createSearchModel(pid, project, title, uid, name, header, share, surname, restrictCost, currentTotal, PermissiblePurpose, search.data)
      //updateProjectModelSearch(restrictCost, uid, name, surname, header, pid, project, title, PermissiblePurpose, share, currentTotal)
      updateLicenseModelSearch(license, title, restrictCost)
      
      // await axios.post('/api/v1/exchange/send',{
      //   email: userEmail,
      //   from: `${name} ${surname}`,
      //   subject: 'Person Listing',
      //   message: 'Your Person Listing search has been successful.'
      // },config);

      res.status(200).send({
        success: true,
        message: "Your search has been conducted successfully, remeber to have a look at your incoming searches."
      })
    } else {
      return res.status(500).send({
        success: false,
        message: "Please make sure a project is selected before a search is done"
      });
    }
  } catch (err) {
    console.log(err)
    return res.status(500).send({
      success: false,
      message: 'Failed to conduct your search, please try again later, or get hold of our support team at nexusintelsupport@nexfor.co.za'
    });
  }
};


/**
 * Controller function to search for a list of people using a third-party API.
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} next - Express next function
 * @returns {Promise<void>}
 */
exports.spouse = async (req, res, next) => {
  // Extract the auth token from the request object.
  const token = req.authToken;

  const uid = req.body.uid; // Define and initialize uid variable
  const name = req.body.name; // Define and initialize name variable
  const header = req.body.header; // Define and initialize header variable
  const share = req.body.share; // Define and initialize share variable
  const surname = req.body.surname; // Define and initialize surname variable
  const restrictCost = req.body.restrictCost; // Define and initialize restrictCost variable
  const currentTotal = req.body.currentTotal; // Define and initialize currentTotal variable
  const project = req.body.project; // Define and initialize PermissiblePurpose variable
  const title = req.body.restrictionName; // Define and initialize PermissiblePurpose variable
  const PermissiblePurpose = req.body.permissiblePurpose; // Define and initialize PermissiblePurpose
  const pid = req.body.pid // Define and initialize pid
  const license = req.body.license; // Define and initialize license
  const IDNumber = req.body.IDNumber; // Define and initialize userEmail


  const info = {
    Token:token,
    PermissiblePurpose: PermissiblePurpose,
    IDNumber: IDNumber,
  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const search = await axios.post(
      `${process.env.CPB_USER_TEST_URL}/people/spouseid?verify=${process.env.CPB_TEST_VERIFY}`,
      info,
      config
    );

    if(pid && search.status === 200){
      // Creating the search model
      createSearchModel(pid, project, title, uid, name, header, share, surname, restrictCost, currentTotal, PermissiblePurpose, search.data)
      //updateProjectModelSearch(restrictCost, uid, name, surname, header, pid, project, title, PermissiblePurpose, share, currentTotal)
      updateLicenseModelSearch(license, title, restrictCost)
      
      // await axios.post('/api/v1/exchange/send',{
      //   email: userEmail,
      //   from: `${name} ${surname}`,
      //   subject: 'Person Listing',
      //   message: 'Your Person Listing search has been successful.'
      // },config);

      res.status(200).send({
        success: true,
        message: "Your search has been conducted successfully, remeber to have a look at your incoming searches."
      })
    } else {
      return res.status(500).send({
        success: false,
        message: "Please make sure a project is selected before a search is done"
      });
    }
  } catch (err) {
    console.log(err)
    return res.status(500).send({
      success: false,
      message: 'Failed to conduct your search, please try again later, or get hold of our support team at nexusintelsupport@nexfor.co.za'
    });
  }
};


/**
 * Controller function to search for a list of people using a third-party API.
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} next - Express next function
 * @returns {Promise<void>}
 */
exports.cipcenterpriseslist = async (req, res, next) => {
  // Extract the auth token from the request object.
  const token = req.authToken;

  const uid = req.body.uid; // Define and initialize uid variable
  const name = req.body.name; // Define and initialize name variable
  const header = req.body.header; // Define and initialize header variable
  const share = req.body.share; // Define and initialize share variable
  const surname = req.body.surname; // Define and initialize surname variable
  const restrictCost = req.body.restrictCost; // Define and initialize restrictCost variable
  const currentTotal = req.body.currentTotal; // Define and initialize currentTotal variable
  const project = req.body.project; // Define and initialize PermissiblePurpose variable
  const title = req.body.restrictionName; // Define and initialize PermissiblePurpose variable
  const PermissiblePurpose = req.body.permissiblePurpose; // Define and initialize PermissiblePurpose
  const pid = req.body.pid // Define and initialize pid
  const license = req.body.license; // Define and initialize license
  const RegistrationNumber = req.body.RegistrationNumber; // Define and initialize userEmail
  const Reference = req.body.Reference; // Define and initialize userEmail


  const info = {
    Token:token,
    PermissiblePurpose: PermissiblePurpose,
    RegistrationNumber: RegistrationNumber,
    Reference: Reference,
  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const search = await axios.post(
      `${process.env.CPB_USER_TEST_URL}/cipcenterprises/list?verify=${process.env.CPB_TEST_VERIFY}`,
      info,
      config
    );

    if(pid && search.status === 200){
      // Creating the search model
      createSearchModel(pid, project, title, uid, name, header, share, surname, restrictCost, currentTotal, PermissiblePurpose, search.data)
      //updateProjectModelSearch(restrictCost, uid, name, surname, header, pid, project, title, PermissiblePurpose, share, currentTotal)
      updateLicenseModelSearch(license, title, restrictCost)
      
      // await axios.post('/api/v1/exchange/send',{
      //   email: userEmail,
      //   from: `${name} ${surname}`,
      //   subject: 'Person Listing',
      //   message: 'Your Person Listing search has been successful.'
      // },config);

      res.status(200).send({
        success: true,
        message: "Your search has been conducted successfully, remeber to have a look at your incoming searches."
      })
    } else {
      return res.status(500).send({
        success: false,
        message: "Please make sure a project is selected before a search is done"
      });
    }
  } catch (err) {
    console.log(err)
    return res.status(500).send({
      success: false,
      message: 'Failed to conduct your search, please try again later, or get hold of our support team at nexusintelsupport@nexfor.co.za'
    });
  }
};


/**
 * Controller function to search for a list of people using a third-party API.
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} next - Express next function
 * @returns {Promise<void>}
 */
exports.commercialdefaultlist = async (req, res, next) => {
  // Extract the auth token from the request object.
  const token = req.authToken;

  const uid = req.body.uid; // Define and initialize uid variable
  const name = req.body.name; // Define and initialize name variable
  const header = req.body.header; // Define and initialize header variable
  const share = req.body.share; // Define and initialize share variable
  const surname = req.body.surname; // Define and initialize surname variable
  const restrictCost = req.body.restrictCost; // Define and initialize restrictCost variable
  const currentTotal = req.body.currentTotal; // Define and initialize currentTotal variable
  const project = req.body.project; // Define and initialize PermissiblePurpose variable
  const title = req.body.restrictionName; // Define and initialize PermissiblePurpose variable
  const PermissiblePurpose = req.body.permissiblePurpose; // Define and initialize PermissiblePurpose
  const pid = req.body.pid // Define and initialize pid
  const license = req.body.license; // Define and initialize license
  const RegistrationNumber = req.body.RegistrationNumber; // Define and initialize userEmail
  const Reference = req.body.Reference; // Define and initialize userEmail


  const info = {
    Token:token,
    PermissiblePurpose: PermissiblePurpose,
    RegistrationNumber: RegistrationNumber,
    Reference: Reference,
  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const search = await axios.post(
      `${process.env.CPB_USER_TEST_URL}/commercialdefault/list?verify=${process.env.CPB_TEST_VERIFY}`,
      info,
      config
    );

    if(pid && search.status === 200){
      // Creating the search model
      createSearchModel(pid, project, title, uid, name, header, share, surname, restrictCost, currentTotal, PermissiblePurpose, search.data)
      //updateProjectModelSearch(restrictCost, uid, name, surname, header, pid, project, title, PermissiblePurpose, share, currentTotal)
      updateLicenseModelSearch(license, title, restrictCost)
      
      // await axios.post('/api/v1/exchange/send',{
      //   email: userEmail,
      //   from: `${name} ${surname}`,
      //   subject: 'Person Listing',
      //   message: 'Your Person Listing search has been successful.'
      // },config);

      res.status(200).send({
        success: true,
        message: "Your search has been conducted successfully, remeber to have a look at your incoming searches."
      })
    } else {
      return res.status(500).send({
        success: false,
        message: "Please make sure a project is selected before a search is done"
      });
    }
  } catch (err) {
    console.log(err)
    return res.status(500).send({
      success: false,
      message: 'Failed to conduct your search, please try again later, or get hold of our support team at nexusintelsupport@nexfor.co.za'
    });
  }
};

/**
 * Controller function to search for a list of people using a third-party API.
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} next - Express next function
 * @returns {Promise<void>}
 */
exports.debtreviewlist = async (req, res, next) => {
  // Extract the auth token from the request object.
  const token = req.authToken;

  const uid = req.body.uid; // Define and initialize uid variable
  const name = req.body.name; // Define and initialize name variable
  const header = req.body.header; // Define and initialize header variable
  const share = req.body.share; // Define and initialize share variable
  const surname = req.body.surname; // Define and initialize surname variable
  const restrictCost = req.body.restrictCost; // Define and initialize restrictCost variable
  const currentTotal = req.body.currentTotal; // Define and initialize currentTotal variable
  const project = req.body.project; // Define and initialize PermissiblePurpose variable
  const title = req.body.restrictionName; // Define and initialize PermissiblePurpose variable
  const PermissiblePurpose = req.body.permissiblePurpose; // Define and initialize PermissiblePurpose
  const pid = req.body.pid // Define and initialize pid
  const license = req.body.license; // Define and initialize license
  const IDNumber = req.body.IDNumber; // Define and initialize userEmail
  const Reference = req.body.Reference; // Define and initialize userEmail


  const info = {
    Token: token,
    PermissiblePurpose: PermissiblePurpose,
    IDNumber: IDNumber,
    Reference: Reference,
  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const search = await axios.post(
      `${process.env.CPB_USER_TEST_URL}/debtreview/list?verify=${process.env.CPB_TEST_VERIFY}`,
      info,
      config
    );

    if(pid && search.status === 200){
      // Creating the search model
      createSearchModel(pid, project, title, uid, name, header, share, surname, restrictCost, currentTotal, PermissiblePurpose, search.data)
      //updateProjectModelSearch(restrictCost, uid, name, surname, header, pid, project, title, PermissiblePurpose, share, currentTotal)
      updateLicenseModelSearch(license, title, restrictCost)
      
      // await axios.post('/api/v1/exchange/send',{
      //   email: userEmail,
      //   from: `${name} ${surname}`,
      //   subject: 'Person Listing',
      //   message: 'Your Person Listing search has been successful.'
      // },config);

      res.status(200).send({
        success: true,
        message: "Your search has been conducted successfully, remeber to have a look at your incoming searches."
      })
    } else {
      return res.status(500).send({
        success: false,
        message: "Please make sure a project is selected before a search is done"
      });
    }
  } catch (err) {
    console.log(err)
    return res.status(500).send({
      success: false,
      message: 'Failed to conduct your search, please try again later, or get hold of our support team at nexusintelsupport@nexfor.co.za'
    });
  }
};


/**
 * Controller function to search for a list of people using a third-party API.
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} next - Express next function
 * @returns {Promise<void>}
 */
exports.deceasedlist = async (req, res, next) => {
  // Extract the auth token from the request object.
  const token = req.authToken;

  const uid = req.body.uid; // Define and initialize uid variable
  const name = req.body.name; // Define and initialize name variable
  const header = req.body.header; // Define and initialize header variable
  const share = req.body.share; // Define and initialize share variable
  const surname = req.body.surname; // Define and initialize surname variable
  const restrictCost = req.body.restrictCost; // Define and initialize restrictCost variable
  const currentTotal = req.body.currentTotal; // Define and initialize currentTotal variable
  const project = req.body.project; // Define and initialize PermissiblePurpose variable
  const title = req.body.restrictionName; // Define and initialize PermissiblePurpose variable
  const PermissiblePurpose = req.body.permissiblePurpose; // Define and initialize PermissiblePurpose
  const pid = req.body.pid // Define and initialize pid
  const license = req.body.license; // Define and initialize license
  const IDNumber = req.body.IDNumber; // Define and initialize userEmail
  const Reference = req.body.Reference; // Define and initialize userEmail


  const info = {
    Token:token,
    PermissiblePurpose: PermissiblePurpose,
    IDNumber: IDNumber,
    Reference: Reference,
    UseDHAExtra: ""
  }


  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const search = await axios.post(
      `${process.env.CPB_USER_TEST_URL}/deceased/list?verify=${process.env.CPB_TEST_VERIFY}`,
      info,
      config
    );

    if(pid && search.status === 200){
      // Creating the search model
      createSearchModel(pid, project, title, uid, name, header, share, surname, restrictCost, currentTotal, PermissiblePurpose, search.data)
      //updateProjectModelSearch(restrictCost, uid, name, surname, header, pid, project, title, PermissiblePurpose, share, currentTotal)
      updateLicenseModelSearch(license, title, restrictCost)
      
      // await axios.post('/api/v1/exchange/send',{
      //   email: userEmail,
      //   from: `${name} ${surname}`,
      //   subject: 'Person Listing',
      //   message: 'Your Person Listing search has been successful.'
      // },config);

      res.status(200).send({
        success: true,
        message: "Your search has been conducted successfully, remeber to have a look at your incoming searches."
      })
    } else {
      return res.status(500).send({
        success: false,
        message: "Please make sure a project is selected before a search is done"
      });
    }
  } catch (err) {
    console.log(err)
    return res.status(500).send({
      success: false,
      message: 'Failed to conduct your search, please try again later, or get hold of our support team at nexusintelsupport@nexfor.co.za'
    });
  }
};


/**
 * Controller function to search for a list of people using a third-party API.
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} next - Express next function
 * @returns {Promise<void>}
 */
exports.deedslist = async (req, res, next) => {
  // Extract the auth token from the request object.
  const token = req.authToken;

  const uid = req.body.uid; // Define and initialize uid variable
  const name = req.body.name; // Define and initialize name variable
  const header = req.body.header; // Define and initialize header variable
  const share = req.body.share; // Define and initialize share variable
  const surname = req.body.surname; // Define and initialize surname variable
  const restrictCost = req.body.restrictCost; // Define and initialize restrictCost variable
  const currentTotal = req.body.currentTotal; // Define and initialize currentTotal variable
  const project = req.body.project; // Define and initialize PermissiblePurpose variable
  const title = req.body.restrictionName; // Define and initialize PermissiblePurpose variable
  const PermissiblePurpose = req.body.permissiblePurpose; // Define and initialize PermissiblePurpose
  const pid = req.body.pid // Define and initialize pid
  const license = req.body.license; // Define and initialize license
  const IDNumber = req.body.IDNumber; // Define and initialize userEmail
  const Reference = req.body.Reference; // Define and initialize userEmail
  const TrustNumber = req.body.TrustNumber; // Define and initialize userEmail
  const RegistrationNumber = req.body.RegistrationNumber; // Define and initialize userEmail


  const info = {
    Token:token,
    PermissiblePurpose: PermissiblePurpose,
    IDNumber: IDNumber,
    RegistrationNumber: RegistrationNumber,
    TrustNumber: TrustNumber,
    Reference: Reference,
  }


  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const search = await axios.post(
      `${process.env.CPB_USER_TEST_URL}/deeds/list?verify=${process.env.CPB_TEST_VERIFY}`,
      info,
      config
    );

    if(pid && search.status === 200){
      // Creating the search model
      createSearchModel(pid, project, title, uid, name, header, share, surname, restrictCost, currentTotal, PermissiblePurpose, search.data)
      //updateProjectModelSearch(restrictCost, uid, name, surname, header, pid, project, title, PermissiblePurpose, share, currentTotal)
      updateLicenseModelSearch(license, title, restrictCost)
      
      // await axios.post('/api/v1/exchange/send',{
      //   email: userEmail,
      //   from: `${name} ${surname}`,
      //   subject: 'Person Listing',
      //   message: 'Your Person Listing search has been successful.'
      // },config);

      res.status(200).send({
        success: true,
        message: "Your search has been conducted successfully, remeber to have a look at your incoming searches."
      })
    } else {
      return res.status(500).send({
        success: false,
        message: "Please make sure a project is selected before a search is done"
      });
    }
  } catch (err) {
    console.log(err)
    return res.status(500).send({
      success: false,
      message: 'Failed to conduct your search, please try again later, or get hold of our support team at nexusintelsupport@nexfor.co.za'
    });
  }
};

/**
 * Controller function to search for a list of people using a third-party API.
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} next - Express next function
 * @returns {Promise<void>}
 */
exports.defaultlist = async (req, res, next) => {
  // Extract the auth token from the request object.
  const token = req.authToken;

  const uid = req.body.uid; // Define and initialize uid variable
  const name = req.body.name; // Define and initialize name variable
  const header = req.body.header; // Define and initialize header variable
  const share = req.body.share; // Define and initialize share variable
  const surname = req.body.surname; // Define and initialize surname variable
  const restrictCost = req.body.restrictCost; // Define and initialize restrictCost variable
  const currentTotal = req.body.currentTotal; // Define and initialize currentTotal variable
  const project = req.body.project; // Define and initialize PermissiblePurpose variable
  const title = req.body.restrictionName; // Define and initialize PermissiblePurpose variable
  const PermissiblePurpose = req.body.permissiblePurpose; // Define and initialize PermissiblePurpose
  const pid = req.body.pid // Define and initialize pid
  const license = req.body.license; // Define and initialize license
  const IDNumber = req.body.IDNumber; // Define and initialize userEmail
  const Reference = req.body.Reference; // Define and initialize userEmail


  const info = {
    Token:token,
    PermissiblePurpose: PermissiblePurpose,
    IDNumber: IDNumber,
    Reference: Reference,
  }


  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const search = await axios.post(
      `${process.env.CPB_USER_TEST_URL}/default/list?verify=${process.env.CPB_TEST_VERIFY}`,
      info,
      config
    );

    if(pid && search.status === 200){
      // Creating the search model
      createSearchModel(pid, project, title, uid, name, header, share, surname, restrictCost, currentTotal, PermissiblePurpose, search.data)
      //updateProjectModelSearch(restrictCost, uid, name, surname, header, pid, project, title, PermissiblePurpose, share, currentTotal)
      updateLicenseModelSearch(license, title, restrictCost)
      
      // await axios.post('/api/v1/exchange/send',{
      //   email: userEmail,
      //   from: `${name} ${surname}`,
      //   subject: 'Person Listing',
      //   message: 'Your Person Listing search has been successful.'
      // },config);

      res.status(200).send({
        success: true,
        message: "Your search has been conducted successfully, remeber to have a look at your incoming searches."
      })
    } else {
      return res.status(500).send({
        success: false,
        message: "Please make sure a project is selected before a search is done"
      });
    }
  } catch (err) {
    console.log(err)
    return res.status(500).send({
      success: false,
      message: 'Failed to conduct your search, please try again later, or get hold of our support team at nexusintelsupport@nexfor.co.za'
    });
  }
};


/**
 * Controller function to search for a list of people using a third-party API.
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} next - Express next function
 * @returns {Promise<void>}
 */
exports.dhalist = async (req, res, next) => {
  // Extract the auth token from the request object.
  const token = req.authToken;

  const uid = req.body.uid; // Define and initialize uid variable
  const name = req.body.name; // Define and initialize name variable
  const header = req.body.header; // Define and initialize header variable
  const share = req.body.share; // Define and initialize share variable
  const surname = req.body.surname; // Define and initialize surname variable
  const restrictCost = req.body.restrictCost; // Define and initialize restrictCost variable
  const currentTotal = req.body.currentTotal; // Define and initialize currentTotal variable
  const project = req.body.project; // Define and initialize PermissiblePurpose variable
  const title = req.body.restrictionName; // Define and initialize PermissiblePurpose variable
  const PermissiblePurpose = req.body.permissiblePurpose; // Define and initialize PermissiblePurpose
  const pid = req.body.pid // Define and initialize pid
  const license = req.body.license; // Define and initialize license
  const IDNumber = req.body.IDNumber; // Define and initialize userEmail
  const Reference = req.body.Reference; // Define and initialize userEmail
  const MaxCacheDays = req.body.MaxCacheDays; // Define and initialize userEmail

  const info = {
    Token:token,
    PermissiblePurpose: PermissiblePurpose,
    IDNumber: IDNumber,
    Reference: Reference,
    MaxCacheDays: MaxCacheDays,
  }


  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const search = await axios.post(
      `${process.env.CPB_USER_TEST_URL}/dha/list?verify=${process.env.CPB_TEST_VERIFY}`,
      info,
      config
    );

    if(pid && search.status === 200){
      // Creating the search model
      createSearchModel(pid, project, title, uid, name, header, share, surname, restrictCost, currentTotal, PermissiblePurpose, search.data)
      //updateProjectModelSearch(restrictCost, uid, name, surname, header, pid, project, title, PermissiblePurpose, share, currentTotal)
      updateLicenseModelSearch(license, title, restrictCost)
      
      // await axios.post('/api/v1/exchange/send',{
      //   email: userEmail,
      //   from: `${name} ${surname}`,
      //   subject: 'Person Listing',
      //   message: 'Your Person Listing search has been successful.'
      // },config);

      res.status(200).send({
        success: true,
        message: "Your search has been conducted successfully, remeber to have a look at your incoming searches."
      })
    } else {
      return res.status(500).send({
        success: false,
        message: "Please make sure a project is selected before a search is done"
      });
    }
  } catch (err) {
    console.log(err)
    return res.status(500).send({
      success: false,
      message: 'Failed to conduct your search, please try again later, or get hold of our support team at nexusintelsupport@nexfor.co.za'
    });
  }
};


/**
 * Controller function to search for a list of people using a third-party API.
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} next - Express next function
 * @returns {Promise<void>}
 */
exports.disputelist = async (req, res, next) => {
  // Extract the auth token from the request object.
  const token = req.authToken;

  const uid = req.body.uid; // Define and initialize uid variable
  const name = req.body.name; // Define and initialize name variable
  const header = req.body.header; // Define and initialize header variable
  const share = req.body.share; // Define and initialize share variable
  const surname = req.body.surname; // Define and initialize surname variable
  const restrictCost = req.body.restrictCost; // Define and initialize restrictCost variable
  const currentTotal = req.body.currentTotal; // Define and initialize currentTotal variable
  const project = req.body.project; // Define and initialize PermissiblePurpose variable
  const title = req.body.restrictionName; // Define and initialize PermissiblePurpose variable
  const PermissiblePurpose = req.body.permissiblePurpose; // Define and initialize PermissiblePurpose
  const pid = req.body.pid // Define and initialize pid
  const license = req.body.license; // Define and initialize license
  const IDNumber = req.body.IDNumber; // Define and initialize userEmail
  const Reference = req.body.Reference; // Define and initialize userEmail

  const info = {
    Token:token,
    PermissiblePurpose: PermissiblePurpose,
    IDNumber: IDNumber,
    Reference: Reference,
  }


  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const search = await axios.post(
      `${process.env.CPB_USER_TEST_URL}/dispute/list?verify=${process.env.CPB_TEST_VERIFY}`,
      info,
      config
    );

    if(pid && search.status === 200){
      // Creating the search model
      createSearchModel(pid, project, title, uid, name, header, share, surname, restrictCost, currentTotal, PermissiblePurpose, search.data)
      //updateProjectModelSearch(restrictCost, uid, name, surname, header, pid, project, title, PermissiblePurpose, share, currentTotal)
      updateLicenseModelSearch(license, title, restrictCost)
      
      // await axios.post('/api/v1/exchange/send',{
      //   email: userEmail,
      //   from: `${name} ${surname}`,
      //   subject: 'Person Listing',
      //   message: 'Your Person Listing search has been successful.'
      // },config);

      res.status(200).send({
        success: true,
        message: "Your search has been conducted successfully, remeber to have a look at your incoming searches."
      })
    } else {
      return res.status(500).send({
        success: false,
        message: "Please make sure a project is selected before a search is done"
      });
    }
  } catch (err) {
    console.log(err)
    return res.status(500).send({
      success: false,
      message: 'Failed to conduct your search, please try again later, or get hold of our support team at nexusintelsupport@nexfor.co.za'
    });
  }
};

/**
 * Controller function to search for a list of people using a third-party API.
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} next - Express next function
 * @returns {Promise<void>}
 */
exports.individuallist = async (req, res, next) => {
  // Extract the auth token from the request object.
  const token = req.authToken;

  const uid = req.body.uid; // Define and initialize uid variable
  const name = req.body.name; // Define and initialize name variable
  const header = req.body.header; // Define and initialize header variable
  const share = req.body.share; // Define and initialize share variable
  const surname = req.body.surname; // Define and initialize surname variable
  const restrictCost = req.body.restrictCost; // Define and initialize restrictCost variable
  const currentTotal = req.body.currentTotal; // Define and initialize currentTotal variable
  const project = req.body.project; // Define and initialize PermissiblePurpose variable
  const title = req.body.restrictionName; // Define and initialize PermissiblePurpose variable
  const PermissiblePurpose = req.body.permissiblePurpose; // Define and initialize PermissiblePurpose
  const pid = req.body.pid // Define and initialize pid
  const license = req.body.license; // Define and initialize license
  const IDNumber = req.body.IDNumber; // Define and initialize userEmail
  const Reference = req.body.Reference; // Define and initialize userEmail
  const MaxCacheDays = req.body.MaxCacheDays; // Define and initialize userEmail

  const info = {
    Token: token,
    PermissiblePurpose: PermissiblePurpose,
    IDNumber: IDNumber,
    Reference: Reference,
    MaxCacheDays: MaxCacheDays,
  }


  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const search = await axios.post(
      `${process.env.CPB_USER_TEST_URL}/idv/list?verify=${process.env.CPB_TEST_VERIFY}`,
      info,
      config
    );

    if(pid && search.status === 200){
      // Creating the search model
      createSearchModel(pid, project, title, uid, name, header, share, surname, restrictCost, currentTotal, PermissiblePurpose, search.data)
      //updateProjectModelSearch(restrictCost, uid, name, surname, header, pid, project, title, PermissiblePurpose, share, currentTotal)
      updateLicenseModelSearch(license, title, restrictCost)
      
      // await axios.post('/api/v1/exchange/send',{
      //   email: userEmail,
      //   from: `${name} ${surname}`,
      //   subject: 'Person Listing',
      //   message: 'Your Person Listing search has been successful.'
      // },config);

      res.status(200).send({
        success: true,
        message: "Your search has been conducted successfully, remeber to have a look at your incoming searches."
      })
    } else {
      return res.status(500).send({
        success: false,
        message: "Please make sure a project is selected before a search is done"
      });
    }
  } catch (err) {
    console.log(err)
    return res.status(500).send({
      success: false,
      message: 'Failed to conduct your search, please try again later, or get hold of our support team at nexusintelsupport@nexfor.co.za'
    });
  }
};


/**
 * Controller function to search for a list of people using a third-party API.
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} next - Express next function
 * @returns {Promise<void>}
 */
exports.individuallist = async (req, res, next) => {
  // Extract the auth token from the request object.
  const token = req.authToken;

  const uid = req.body.uid; // Define and initialize uid variable
  const name = req.body.name; // Define and initialize name variable
  const header = req.body.header; // Define and initialize header variable
  const share = req.body.share; // Define and initialize share variable
  const surname = req.body.surname; // Define and initialize surname variable
  const restrictCost = req.body.restrictCost; // Define and initialize restrictCost variable
  const currentTotal = req.body.currentTotal; // Define and initialize currentTotal variable
  const project = req.body.project; // Define and initialize PermissiblePurpose variable
  const title = req.body.restrictionName; // Define and initialize PermissiblePurpose variable
  const PermissiblePurpose = req.body.permissiblePurpose; // Define and initialize PermissiblePurpose
  const pid = req.body.pid // Define and initialize pid
  const license = req.body.license; // Define and initialize license
  const IDNumber = req.body.IDNumber; // Define and initialize userEmail
  const Reference = req.body.Reference; // Define and initialize userEmail
  const MaxCacheDays = req.body.MaxCacheDays; // Define and initialize userEmail

  const info = {
    Token: token,
    PermissiblePurpose: PermissiblePurpose,
    IDNumber: IDNumber,
    Reference: Reference,
    MaxCacheDays: MaxCacheDays,
  }


  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const search = await axios.post(
      `${process.env.CPB_USER_TEST_URL}/idv/list?verify=${process.env.CPB_TEST_VERIFY}`,
      info,
      config
    );

    if(pid && search.status === 200){
      // Creating the search model
      createSearchModel(pid, project, title, uid, name, header, share, surname, restrictCost, currentTotal, PermissiblePurpose, search.data)
      //updateProjectModelSearch(restrictCost, uid, name, surname, header, pid, project, title, PermissiblePurpose, share, currentTotal)
      updateLicenseModelSearch(license, title, restrictCost)
      
      // await axios.post('/api/v1/exchange/send',{
      //   email: userEmail,
      //   from: `${name} ${surname}`,
      //   subject: 'Person Listing',
      //   message: 'Your Person Listing search has been successful.'
      // },config);

      res.status(200).send({
        success: true,
        message: "Your search has been conducted successfully, remeber to have a look at your incoming searches."
      })
    } else {
      return res.status(500).send({
        success: false,
        message: "Please make sure a project is selected before a search is done"
      });
    }
  } catch (err) {
    console.log(err)
    return res.status(500).send({
      success: false,
      message: 'Failed to conduct your search, please try again later, or get hold of our support team at nexusintelsupport@nexfor.co.za'
    });
  }
};


/**
 * Controller function to search for a list of people using a third-party API.
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} next - Express next function
 * @returns {Promise<void>}
 */
exports.incomepredictionlist = async (req, res, next) => {
  // Extract the auth token from the request object.
  const token = req.authToken;

  const uid = req.body.uid; // Define and initialize uid variable
  const name = req.body.name; // Define and initialize name variable
  const header = req.body.header; // Define and initialize header variable
  const share = req.body.share; // Define and initialize share variable
  const surname = req.body.surname; // Define and initialize surname variable
  const restrictCost = req.body.restrictCost; // Define and initialize restrictCost variable
  const currentTotal = req.body.currentTotal; // Define and initialize currentTotal variable
  const project = req.body.project; // Define and initialize PermissiblePurpose variable
  const title = req.body.restrictionName; // Define and initialize PermissiblePurpose variable
  const PermissiblePurpose = req.body.permissiblePurpose; // Define and initialize PermissiblePurpose
  const pid = req.body.pid // Define and initialize pid
  const license = req.body.license; // Define and initialize license
  const IDNumber = req.body.IDNumber; // Define and initialize userEmail
  const Reference = req.body.Reference; // Define and initialize userEmail

  const info = {
    Token:token,
    PermissiblePurpose: PermissiblePurpose,
    IDNumber: IDNumber,
    Reference: Reference,
}


  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const search = await axios.post(
      `${process.env.CPB_USER_TEST_URL}/incomeprediction/list?verify=${process.env.CPB_TEST_VERIFY}`,
      info,
      config
    );

    if(pid && search.status === 200){
      // Creating the search model
      createSearchModel(pid, project, title, uid, name, header, share, surname, restrictCost, currentTotal, PermissiblePurpose, search.data)
      //updateProjectModelSearch(restrictCost, uid, name, surname, header, pid, project, title, PermissiblePurpose, share, currentTotal)
      updateLicenseModelSearch(license, title, restrictCost)
      
      // await axios.post('/api/v1/exchange/send',{
      //   email: userEmail,
      //   from: `${name} ${surname}`,
      //   subject: 'Person Listing',
      //   message: 'Your Person Listing search has been successful.'
      // },config);

      res.status(200).send({
        success: true,
        message: "Your search has been conducted successfully, remeber to have a look at your incoming searches."
      })
    } else {
      return res.status(500).send({
        success: false,
        message: "Please make sure a project is selected before a search is done"
      });
    }
  } catch (err) {
    console.log(err)
    return res.status(500).send({
      success: false,
      message: 'Failed to conduct your search, please try again later, or get hold of our support team at nexusintelsupport@nexfor.co.za'
    });
  }
};



/**
 * Controller function to search for a list of people using a third-party API.
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} next - Express next function
 * @returns {Promise<void>}
 */
exports.judgementlist = async (req, res, next) => {
  // Extract the auth token from the request object.
  const token = req.authToken;

  const uid = req.body.uid; // Define and initialize uid variable
  const name = req.body.name; // Define and initialize name variable
  const header = req.body.header; // Define and initialize header variable
  const share = req.body.share; // Define and initialize share variable
  const surname = req.body.surname; // Define and initialize surname variable
  const restrictCost = req.body.restrictCost; // Define and initialize restrictCost variable
  const currentTotal = req.body.currentTotal; // Define and initialize currentTotal variable
  const project = req.body.project; // Define and initialize PermissiblePurpose variable
  const title = req.body.restrictionName; // Define and initialize PermissiblePurpose variable
  const PermissiblePurpose = req.body.permissiblePurpose; // Define and initialize PermissiblePurpose
  const pid = req.body.pid // Define and initialize pid
  const license = req.body.license; // Define and initialize license
  const IDNumber = req.body.IDNumber; // Define and initialize userEmail
  const Reference = req.body.Reference; // Define and initialize userEmail

  const info = {
    Token: token,
    PermissiblePurpose: PermissiblePurpose,
    IDNumber: IDNumber,
    Reference: Reference,
  }


  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const search = await axios.post(
      `${process.env.CPB_USER_TEST_URL}/judgment/list?verify=${process.env.CPB_TEST_VERIFY}`,
      info,
      config
    );

    if(pid && search.status === 200){
      // Creating the search model
      createSearchModel(pid, project, title, uid, name, header, share, surname, restrictCost, currentTotal, PermissiblePurpose, search.data)
      //updateProjectModelSearch(restrictCost, uid, name, surname, header, pid, project, title, PermissiblePurpose, share, currentTotal)
      updateLicenseModelSearch(license, title, restrictCost)
      
      // await axios.post('/api/v1/exchange/send',{
      //   email: userEmail,
      //   from: `${name} ${surname}`,
      //   subject: 'Person Listing',
      //   message: 'Your Person Listing search has been successful.'
      // },config);

      res.status(200).send({
        success: true,
        message: "Your search has been conducted successfully, remeber to have a look at your incoming searches."
      })
    } else {
      return res.status(500).send({
        success: false,
        message: "Please make sure a project is selected before a search is done"
      });
    }
  } catch (err) {
    console.log(err)
    return res.status(500).send({
      success: false,
      message: 'Failed to conduct your search, please try again later, or get hold of our support team at nexusintelsupport@nexfor.co.za'
    });
  }
};



/**
 * Controller function to search for a list of people using a third-party API.
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} next - Express next function
 * @returns {Promise<void>}
 */
exports.paymentprofileslist = async (req, res, next) => {
  // Extract the auth token from the request object.
  const token = req.authToken;

  const uid = req.body.uid; // Define and initialize uid variable
  const name = req.body.name; // Define and initialize name variable
  const header = req.body.header; // Define and initialize header variable
  const share = req.body.share; // Define and initialize share variable
  const surname = req.body.surname; // Define and initialize surname variable
  const restrictCost = req.body.restrictCost; // Define and initialize restrictCost variable
  const currentTotal = req.body.currentTotal; // Define and initialize currentTotal variable
  const project = req.body.project; // Define and initialize PermissiblePurpose variable
  const title = req.body.restrictionName; // Define and initialize PermissiblePurpose variable
  const PermissiblePurpose = req.body.permissiblePurpose; // Define and initialize PermissiblePurpose
  const pid = req.body.pid // Define and initialize pid
  const license = req.body.license; // Define and initialize license
  const IDNumber = req.body.IDNumber; // Define and initialize userEmail
  const Reference = req.body.Reference; // Define and initialize userEmail
  const EnquiryReason = req.body.EnquiryReason; // Define and initialize userEmail

  const info = {
    Token:token,
    PermissiblePurpose: PermissiblePurpose,
    IDNumber: IDNumber,
    EnquiryReason: EnquiryReason,
    Reference: Reference,
}


  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const search = await axios.post(
      `${process.env.CPB_USER_TEST_URL}/paymentprofiles/list?verify=${process.env.CPB_TEST_VERIFY}`,
      info,
      config
    );

    if(pid && search.status === 200){
      // Creating the search model
      createSearchModel(pid, project, title, uid, name, header, share, surname, restrictCost, currentTotal, PermissiblePurpose, search.data)
      //updateProjectModelSearch(restrictCost, uid, name, surname, header, pid, project, title, PermissiblePurpose, share, currentTotal)
      updateLicenseModelSearch(license, title, restrictCost)
      
      // await axios.post('/api/v1/exchange/send',{
      //   email: userEmail,
      //   from: `${name} ${surname}`,
      //   subject: 'Person Listing',
      //   message: 'Your Person Listing search has been successful.'
      // },config);

      res.status(200).send({
        success: true,
        message: "Your search has been conducted successfully, remeber to have a look at your incoming searches."
      })
    } else {
      return res.status(500).send({
        success: false,
        message: "Please make sure a project is selected before a search is done"
      });
    }
  } catch (err) {
    console.log(err)
    return res.status(500).send({
      success: false,
      message: 'Failed to conduct your search, please try again later, or get hold of our support team at nexusintelsupport@nexfor.co.za'
    });
  }
};


/**
 * Controller function to search for a list of people using a third-party API.
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} next - Express next function
 * @returns {Promise<void>}
 */
exports.pepslist = async (req, res, next) => {
  // Extract the auth token from the request object.
  const token = req.authToken;

  const uid = req.body.uid; // Define and initialize uid variable
  const name = req.body.name; // Define and initialize name variable
  const userEmail = req.body.userEmail; // Define and initialize
  const header = req.body.header; // Define and initialize header variable
  const share = req.body.share; // Define and initialize share variable
  const surname = req.body.surname; // Define and initialize surname variable
  const restrictCost = req.body.restrictCost; // Define and initialize restrictCost variable
  const currentTotal = req.body.currentTotal; // Define and initialize currentTotal variable
  const project = req.body.project; // Define and initialize PermissiblePurpose variable
  const title = req.body.restrictionName; // Define and initialize PermissiblePurpose variable
  const PermissiblePurpose = req.body.PermissiblePurpose; // Define and initialize PermissiblePurpose
  const pid = req.body.pid // Define and initialize pid
  const license = req.body.license; // Define and initialize license
  const Term = req.body.Term; // Define and initialize userEmail
  const Reference = req.body.Reference; // Define and initialize userEmail
  const Refinement = req.body.Refinement; // Define and initialize userEmail
  const Scope = req.body.Scope; // Define and initialize userEmail
  const StartDate = req.body.StartDate; // Define and initialize userEmail
  const EndDate = req.body.EndDate; // Define and initialize userEmail
  const Categories = req.body.Categories; // Define and initialize userEmail
  const ThresholdScore = req.body.ThresholdScore; // Define and initialize userEmail
  const DateOfBirth = req.body.DateOfBirth; // Define and initialize userEmail
  const WatchListIDs = req.body.WatchListIDs; // Define and initialize userEmail

  const info = {
    Token:token,
    PermissiblePurpose: PermissiblePurpose,
    Reference: Reference,
    Term: Term,
    Refinement: Refinement,
    Scope: Scope,
    StartDate: StartDate,
    EndDate: EndDate,
    Categories: Categories,
    ThresholdScore: ThresholdScore,
    DateOfBirth: DateOfBirth,
    WatchListIDs: [213,321,35,44],
  }


  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const search = await axios.post(
      `${process.env.CPB_USER_TEST_URL}/wrapper/screeningreport?verify=${process.env.CPB_TEST_VERIFY}`,
      info,
      config
    );

    if(search.status === 200){
      // Creating the search model
      createSearchModel(pid, project, title, uid, name, header, share, surname, restrictCost, currentTotal, PermissiblePurpose, search.data)
      //updateProjectModelSearch(restrictCost, uid, name, surname, header, pid, project, title, PermissiblePurpose, share, currentTotal, search.data)
      updateLicenseModelSearch(license, title, restrictCost)
      
      await axios.post('http://localhost:5000/api/v1/exchange/send',{
        email: userEmail,
        from: `${name} ${surname}`,
        encodedPDF: search.data.EncodedPDF,
        subject: 'PEP Listing',
        message: 'Your PEP Listing search was a success. Your search may be viewed in the Nexus Intelligence dashboard, where you may also explore other features at your Incoming Searches.'
      },config);

      res.status(200).send({
        success: true,
        message: "Your search has been conducted successfully, remeber to have a look at your incoming searches."
      })
    } else {
      return res.status(500).send({
        success: false,
        message: "Please make sure a project is selected before a search is done"
      });
    }
  } catch (err) {
    console.log(err);
    if (err.response && err.response.data) {
      // The request was made and the server responded with a status code
      return res.status(500).send({
        success: false,
        message: err.response.data
      });
    } else if (err.request) {
      // The request was made but no response was received
      return res.status(500).send({
        success: false,
        message: 'No response received from server'
      });
    } else {
      // Something else happened in making the request that triggered the error
      return res.status(500).send({
        success: false,
        message: err
      });
    }
  }
};


/**
 * Controller function to search for a list of people using a third-party API.
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} next - Express next function
 * @returns {Promise<void>}
 */
exports.businessinterestenquiry = async (req, res, next) => {
  // Extract the auth token from the request object.
  const token = req.authToken;

  const uid = req.body.uid; // Define and initialize uid variable
  const userEmail = req.body.userEmail;
  const name = req.body.name; // Define and initialize name variable
  const header = req.body.header; // Define and initialize header variable
  const share = req.body.share; // Define and initialize share variable
  const surname = req.body.surname; // Define and initialize surname variable
  const restrictCost = req.body.restrictCost; // Define and initialize restrictCost variable
  const currentTotal = req.body.currentTotal; // Define and initialize currentTotal variable
  const project = req.body.project; // Define and initialize PermissiblePurpose variable
  const title = req.body.restrictionName; // Define and initialize PermissiblePurpose variable
  const PermissiblePurpose = req.body.PermissiblePurpose; // Define and initialize PermissiblePurpose
  const pid = req.body.pid // Define and initialize pid
  const license = req.body.license; // Define and initialize license
  const IDNumber = req.body.IDNumber; // Define and initialize userEmail
  const Reference = req.body.Reference; // Define and initialize userEmail
  const EnquiryReason = req.body.EnquiryReason; // Define and initialize userEmail
  const UseDHAExtra = req.body.UseDHAExtra; // Define and initialize userEmail
  const UseSAFPSDirect = req.body.UseSAFPSDirect; // Define and initialize userEmail
  const EnquiryDoneBy = req.body.EnquiryDoneBy; // Define and initialize userEmail
  const RawHTML = req.body.RawHTML; // Define and initialize userEmail

  const info = {
    Token:token,
    PermissiblePurpose: PermissiblePurpose,
    IDNumber: IDNumber,
    EnquiryReason: EnquiryReason,
    EnquiryDoneBy: EnquiryDoneBy,
    UseDHAExtra: UseDHAExtra,
    UseSAFPSDirect: UseSAFPSDirect,
    RawHTML: RawHTML,
    Reference: Reference,
}


  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const search = await axios.post(
      `${process.env.CPB_USER_TEST_URL}/dynamicwrapper/business-interest-enquiry?verify=${process.env.CPB_TEST_VERIFY}`,
      info,
      config
    );

    if(pid && search.status === 200){
      // Creating the search model
      createSearchModel(pid, project, title, uid, name, header, share, surname, restrictCost, currentTotal, PermissiblePurpose, search.data)
      //updateProjectModelSearch(restrictCost, uid, name, surname, header, pid, project, title, PermissiblePurpose, share, currentTotal, search.data)
      updateLicenseModelSearch(license, title, restrictCost)
      
      await axios.post('http://localhost:5000/api/v1/exchange/send',{
        email: userEmail,
        from: `${name} ${surname}`,
        subject: 'Business Interest Enquiry',
        encodedPDF: search.data.Results[0].EncodedPDF,
        message: 'Your Business Interest Enquiry search was a success. Your search may be viewed in the Nexus Intelligence dashboard, where you may also explore other features at your Incoming Searches.'
      },config);

      res.status(200).send({
        success: true,
        message: "Your search has been conducted successfully, remeber to have a look at your incoming searches."
      })
    } else {
      return res.status(500).send({
        success: false,
        message: "Please make sure a project is selected before a search is done"
      });
    }
  } catch (err) {
    console.log(err);
    if (err.response && err.response.data) {
      // The request was made and the server responded with a status code
      return res.status(500).send({
        success: false,
        message: err.response.data
      });
    } else if (err.request) {
      // The request was made but no response was received
      return res.status(500).send({
        success: false,
        message: 'No response received from server'
      });
    } else {
      // Something else happened in making the request that triggered the error
      return res.status(500).send({
        success: false,
        message: err
      });
    }
  }
};


exports.idvwithphotovalidation = async (req, res, next) => {
  // Extract the auth token from the request object.
  const token = req.authToken;

  const uid = req.body.uid; // Define and initialize uid variable
  const name = req.body.name; // Define and initialize name variable
  const userEmail = req.body.userEmail;
  const header = req.body.header; // Define and initialize header variable
  const share = req.body.share; // Define and initialize share variable
  const surname = req.body.surname; // Define and initialize surname variable
  const restrictCost = req.body.restrictCost; // Define and initialize restrictCost variable
  const currentTotal = req.body.currentTotal; // Define and initialize currentTotal variable
  const project = req.body.project; // Define and initialize PermissiblePurpose variable
  const title = req.body.restrictionName; // Define and initialize PermissiblePurpose variable
  const PermissiblePurpose = req.body.PermissiblePurpose; // Define and initialize PermissiblePurpose
  const pid = req.body.pid // Define and initialize pid
  const license = req.body.license; // Define and initialize license
  const Reference = req.body.Reference; // Define and initialize userEmail
  const IDNumber = req.body.IDNumber; // Define and initialize userEmail


  const info = {
    Token:token,
    PermissiblePurpose: "Fraud Detection and Prevention",
    IDNumber: IDNumber,
    Reference: Reference,
    hasConsent: "true",
    EnquiryReason: "Fraud Detection and Prevention",
    EnquiryType: "idvalidationphoto",
  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const search = await axios.post(
      `${process.env.CPB_USER_TEST_URL}/wrapper/idvlistpdf?verify=${process.env.CPB_TEST_VERIFY}`,
      info,
      config
    );

    if(pid && search.status === 200){
      // Creating the search model
      createSearchModel(pid, project, title, uid, name, header, share, surname, restrictCost, currentTotal, PermissiblePurpose, search.data)
      //updateProjectModelSearch(restrictCost, uid, name, surname, header, pid, project, title, PermissiblePurpose, share, currentTotal, search.data)
      updateLicenseModelSearch(license, title, restrictCost)
      
      await axios.post('http://localhost:5000/api/v1/exchange/send',{
        email: userEmail,
        from: `${name} ${surname}`,
        subject: 'IDV Listing including photo',
        encodedPDF: search.data.EncodedPDF,
        message: 'Your IDV Listing including photo search was a success. Your search may be viewed in the Nexus Intelligence dashboard, where you may also explore other features at your Incoming Searches.'
      },config);

      res.status(200).send({
        success: true,
        message: "Your search has been conducted successfully, remeber to have a look at your incoming searches."
      })
    } else {
      return res.status(500).send({
        success: false,
        message: "Please make sure a project is selected before a search is done"
      });
    }
  } catch (err) {
    console.log(err);
    if (err.response && err.response.data) {
      // The request was made and the server responded with a status code
      return res.status(500).send({
        success: false,
        message: err.response.data
      });
    } else if (err.request) {
      // The request was made but no response was received
      return res.status(500).send({
        success: false,
        message: 'No response received from server'
      });
    } else {
      // Something else happened in making the request that triggered the error
      return res.status(500).send({
        success: false,
        message: err
      });
    }
  }
};


/**
 * Controller function to search for a list of people using a third-party API.
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} next - Express next function
 * @returns {Promise<void>}
 */
exports.idvwithoutphotovalidation = async (req, res, next) => {
  // Extract the auth token from the request object.
  const token = req.authToken;

  const uid = req.body.uid; // Define and initialize uid variable
  const name = req.body.name; // Define and initialize name variable
  const userEmail = req.body.userEmail; // Define and initialize name variable
  const header = req.body.header; // Define and initialize header variable
  const share = req.body.share; // Define and initialize share variable
  const surname = req.body.surname; // Define and initialize surname variable
  const restrictCost = req.body.restrictCost; // Define and initialize restrictCost variable
  const currentTotal = req.body.currentTotal; // Define and initialize currentTotal variable
  const project = req.body.project; // Define and initialize PermissiblePurpose variable
  const title = req.body.restrictionName; // Define and initialize PermissiblePurpose variable
  const PermissiblePurpose = req.body.PermissiblePurpose; // Define and initialize PermissiblePurpose
  const pid = req.body.pid // Define and initialize pid
  const license = req.body.license; // Define and initialize license
  const RegistrationNumber = req.body.RegistrationNumber; // Define and initialize userEmail
  const Reference = req.body.Reference; // Define and initialize userEmail
  const IDNumber = req.body.IDNumber; // Define and initialize userEmail
  const MaxCacheDays = req.body.MaxCacheDays; // Define and initialize userEmail


  const info = {
    Token:token,
    PermissiblePurpose: "Fraud Detection and Prevention",
    IDNumber: IDNumber,
    Reference: Reference,
    hasConsent: "true",
    EnquiryReason: "Fraud Detection and Prevention",
    EnquiryType: "idvalidation",
  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const search = await axios.post(
      `${process.env.CPB_USER_TEST_URL}/wrapper/idvlistpdf?verify=${process.env.CPB_TEST_VERIFY}`,
      info,
      config
    );

    if(pid && search.status === 200){
      // Creating the search model
      createSearchModel(pid, project, title, uid, name, header, share, surname, restrictCost, currentTotal, PermissiblePurpose, search.data)
      //updateProjectModelSearch(restrictCost, uid, name, surname, header, pid, project, title, PermissiblePurpose, share, currentTotal, search.data)
      updateLicenseModelSearch(license, title, restrictCost)
       
      await axios.post('http://localhost:5000/api/v1/exchange/send',{
        email: userEmail,
        from: `${name} ${surname}`,
        encodedPDF: search.data.EncodedPDF,
        subject: 'IDV Listing without photo',
        message: 'Your IDV Listing without photo search was a success. Your search may be viewed in the Nexus Intelligence dashboard, where you may also explore other features at your Incoming Searches.'
      },config);

      res.status(200).send({
        success: true,
        message: "Your search has been conducted successfully, remeber to have a look at your incoming searches."
      })
    } else {
      return res.status(500).send({
        success: false,
        message: "Please make sure a project is selected before a search is done"
      });
    }
  } catch (err) {
    console.log(err);
    if (err.response && err.response.data) {
      // The request was made and the server responded with a status code
      return res.status(500).send({
        success: false,
        message: err.response.data
      });
    } else if (err.request) {
      // The request was made but no response was received
      return res.status(500).send({
        success: false,
        message: 'No response received from server'
      });
    } else {
      // Something else happened in making the request that triggered the error
      return res.status(500).send({
        success: false,
        message: err
      });
    }
  }
};

/**
 * Controller function to search for a list of people using a third-party API.
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} next - Express next function
 * @returns {Promise<void>}
 */
 exports.homeaffairsverification = async (req, res, next) => {
  // Extract the auth token from the request object.
  const token = req.authToken;

  const uid = req.body.uid; // Define and initialize uid variable
  const name = req.body.name; // Define and initialize name variable
  const header = req.body.header; // Define and initialize header variable
  const share = req.body.share; // Define and initialize share variable
  const surname = req.body.surname; // Define and initialize surname variable
  const restrictCost = req.body.restrictCost; // Define and initialize restrictCost variable
  const currentTotal = req.body.currentTotal; // Define and initialize currentTotal variable
  const project = req.body.project; // Define and initialize PermissiblePurpose variable
  const title = req.body.restrictionName; // Define and initialize PermissiblePurpose variable
  const PermissiblePurpose = req.body.PermissiblePurpose; // Define and initialize PermissiblePurpose
  const pid = req.body.pid // Define and initialize pid
  const license = req.body.license; // Define and initialize license
  const RegistrationNumber = req.body.RegistrationNumber; // Define and initialize userEmail
  const Reference = req.body.Reference; // Define and initialize userEmail
  const IDNumber = req.body.IDNumber; // Define and initialize userEmail
  const MaxCacheDays = req.body.MaxCacheDays; // Define and initialize userEmail


  const info = {
    Token:token,
    PermissiblePurpose: PermissiblePurpose,
    IDNumber: IDNumber,
    MaxCacheDays: 2,
    Reference: Reference,
  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const search = await axios.post(
      `${process.env.CPB_USER_TEST_URL}/idv/list?verify=${process.env.CPB_TEST_VERIFY}`,
      info,
      config
    );

    if(pid && search.status === 200){
      // Creating the search model
      createSearchModel(pid, project, title, uid, name, header, share, surname, restrictCost, currentTotal, PermissiblePurpose, search.data)
      //updateProjectModelSearch(restrictCost, uid, name, surname, header, pid, project, title, PermissiblePurpose, share, currentTotal)
      updateLicenseModelSearch(license, title, restrictCost)
      
      // await axios.post('/api/v1/exchange/send',{
      //   email: userEmail,
      //   from: `${name} ${surname}`,
      //   subject: 'Person Listing',
      //   message: 'Your Person Listing search has been successful.'
      // },config);

      res.status(200).send({
        success: true,
        message: "Your search has been conducted successfully, remeber to have a look at your incoming searches."
      })
    } else {
      return res.status(500).send({
        success: false,
        message: "Please make sure a project is selected before a search is done"
      });
    }
  } catch (err) {
    console.log(err)
    return res.status(500).send({
      success: false,
      message: 'Failed to conduct your search, please try again later, or get hold of our support team at nexusintelsupport@nexfor.co.za'
    });
  }
};



/**
 * Controller function to search for a list of people using a third-party API.
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} next - Express next function
 * @returns {Promise<void>}
 */
 exports.bankaccountverification = async (req, res, next) => {
  // Extract the auth token from the request object.
  const token = req.authToken;

  const uid = req.body.uid; // Define and initialize uid variable
  const name = req.body.name; // Define and initialize name variable
  const header = req.body.header; // Define and initialize header variable
  const userEmail = req.body.userEmail; // Define and initialize header variable
  const share = req.body.share; // Define and initialize share variable
  const surname = req.body.surname; // Define and initialize surname variable
  const restrictCost = req.body.restrictCost; // Define and initialize restrictCost variable
  const currentTotal = req.body.currentTotal; // Define and initialize currentTotal variable
  const project = req.body.project; // Define and initialize PermissiblePurpose variable
  const title = req.body.restrictionName; // Define and initialize PermissiblePurpose variable
  const PermissiblePurpose = req.body.PermissiblePurpose; // Define and initialize PermissiblePurpose
  const pid = req.body.pid // Define and initialize pid
  const license = req.body.license; // Define and initialize license
  const BranchCode = req.body.BranchCode; // Define and initialize userEmail
  const Reference = req.body.Reference; // Define and initialize userEmail
  const IDNumber = req.body.IDNumber; // Define and initialize userEmail
  const AccountNumber = req.body.AccountNumber; // Define and initialize userEmail
  const AccountType = req.body.AccountType; // Define and initialize userEmail
  const IdentificationType = req.body.IdentificationType; // Define and initialize userEmail
  const Bank = req.body.Bank; // Define and initialize userEmail
  const Email = req.body.Email; // Define and initialize userEmail
  const PhoneNumber = req.body.PhoneNumber; // Define and initialize userEmail
  const Initials = req.body.Initials; // Define and initialize userEmail
  const FirstName = req.body.FirstName; // Define and initialize userEmail
  const Surname = req.body.Surname; // Define and initialize userEmail
  const HasConsent = req.body.HasConsent; // Define and initialize userEmail


  const info = {
    Token:token,
    PermissiblePurpose: PermissiblePurpose,
    IDNumber: IDNumber,
    Reference: Reference,
    AccountNumber: AccountNumber,
    AccountType: AccountType,
    BranchCode: BranchCode,
    IdentificationType: IdentificationType,
    Bank: Bank,
    Email: Email,
    PhoneNumber: PhoneNumber,
    Initials: Initials,
    FirstName: FirstName,
    Surname: Surname,
    HasConsent: HasConsent,
  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const search = await axios.post(
      `${process.env.CPB_USER_TEST_URL}/wrapper/bureauavs?verify=${process.env.CPB_TEST_VERIFY}`,
      info,
      config
    );

    if(pid && search.status === 200){
      // Creating the search model
      createSearchModel(pid, project, title, uid, name, header, share, surname, restrictCost, currentTotal, PermissiblePurpose, search.data)
      //updateProjectModelSearch(restrictCost, uid, name, surname, header, pid, project, title, PermissiblePurpose, share, currentTotal, search.data)
      updateLicenseModelSearch(license, title, restrictCost)
      
      await axios.post('http://localhost:5000/api/v1/exchange/send',{
        email: userEmail,
        from: `${name} ${surname}`,
        encodedPDF: search.data.EncodedPDF,
        subject: 'Bank Account Verification',
        message: 'Congratulations! Your Bank Account Verification search was a success. We invite you to check out the Nexus Intelligence dashboard where you can view your search and explore other features at your Incoming Searches. Thank you for trusting us to provide you with the information you need to make informed decisions.'
      },config);

      res.status(200).send({
        success: true,
        message: "Your search has been conducted successfully, remeber to have a look at your incoming searches."
      })
    } else {
      return res.status(500).send({
        success: false,
        message: "Please make sure a project is selected before a search is done"
      });
    }
  } catch (err) {
    console.log(err);
    if (err.response && err.response.data) {
      // The request was made and the server responded with a status code
      return res.status(500).send({
        success: false,
        message: err.response.data
      });
    } else if (err.request) {
      // The request was made but no response was received
      return res.status(500).send({
        success: false,
        message: 'No response received from server'
      });
    } else {
      // Something else happened in making the request that triggered the error
      return res.status(500).send({
        success: false,
        message: err
      });
    }
  }
};


/**
 * Controller function to search for a list of people using a third-party API.
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} next - Express next function
 * @returns {Promise<void>}
 */
 exports.companyenquiryreportcipc = async (req, res, next) => {
  // Extract the auth token from the request object.
  const token = req.authToken;

  const uid = req.body.uid; // Define and initialize uid variable
  const name = req.body.name; // Define and initialize name variable
  const userEmail = req.body.userEmail; // Define and initialize name variable
  const header = req.body.header; // Define and initialize header variable
  const share = req.body.share; // Define and initialize share variable
  const surname = req.body.surname; // Define and initialize surname variable
  const restrictCost = req.body.restrictCost; // Define and initialize restrictCost variable
  const currentTotal = req.body.currentTotal; // Define and initialize currentTotal variable
  const project = req.body.project; // Define and initialize PermissiblePurpose variable
  const title = req.body.restrictionName; // Define and initialize PermissiblePurpose variable
  const PermissiblePurpose = req.body.PermissiblePurpose; // Define and initialize PermissiblePurpose
  const pid = req.body.pid // Define and initialize pid
  const license = req.body.license; // Define and initialize license
  const RegistrationNumber = req.body.RegistrationNumber; // Define and initialize userEmail
  const Reference = req.body.Reference; // Define and initialize userEmail
  const IDNumber = req.body.IDNumber; // Define and initialize userEmail
  const EnquiryDoneBy = req.body.EnquiryDoneBy; // Define and initialize userEmail


  const info = {
    Token:token,
    PermissiblePurpose: "Fraud Detection and Prevention",
    Reference: Reference,
    RegistrationNumber: RegistrationNumber,
    InputCompany: IDNumber,
    EnquiryReason: "Fraud Detection and Prevention",
    EnquiryDoneBy: EnquiryDoneBy
  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const search = await axios.post(
      `${process.env.CPB_USER_TEST_URL}/wrapper/companyenquiryreport_cipc?verify=${process.env.CPB_TEST_VERIFY}`,
      info,
      config
    );

    if(search.status === 200){
      // Creating the search model
      createSearchModel(pid, project, title, uid, name, header, share, surname, restrictCost, currentTotal, PermissiblePurpose, search.data)
      //updateProjectModelSearch(restrictCost, uid, name, surname, header, pid, project, title, PermissiblePurpose, share, currentTotal)
      updateLicenseModelSearch(license, title, restrictCost)

      await axios.post('http://localhost:5000/api/v1/exchange/send',{
        email: userEmail,
        from: `${name} ${surname}`,
        encodedPDF: search.data.EncodedPDF,
        subject: 'Commercial Enquiry',
        message: 'Your Commercial search was a success. Your search may be viewed in the Nexus Intelligence dashboard, where you may also explore other features at your Incoming Searches.'
      },config);

      res.status(200).send({
        success: true,
        message: "Your search has been conducted successfully, remeber to have a look at your incoming searches."
      })
    } else {
      return res.status(500).send({
        success: false,
        message: "Please make sure a project is selected before a search is done"
      });
    }
  } catch (err) {
    console.log(err)
    return res.status(500).send({
      success: false,
      message: 'Failed to conduct your search, please try again later, or get hold of our support team at nexusintelsupport@nexfor.co.za'
    });
  }
};


/**
 * Controller function to search for a list of people using a third-party API.
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} next - Express next function
 * @returns {Promise<void>}
 */
 exports.dynamicwrapper = async (req, res, next) => {
  // Extract the auth token from the request object.
  const token = req.authToken;

  const uid = req.body.uid; // Define and initialize uid variable
  const userEmail = req.body.userEmail;
  const name = req.body.name; // Define and initialize name variable
  const header = req.body.header; // Define and initialize header variable
  const share = req.body.share; // Define and initialize share variable
  const surname = req.body.surname; // Define and initialize surname variable
  const restrictCost = req.body.restrictCost; // Define and initialize restrictCost variable
  const currentTotal = req.body.currentTotal; // Define and initialize currentTotal variable
  const project = req.body.project; // Define and initialize PermissiblePurpose variable
  const title = req.body.restrictionName; // Define and initialize PermissiblePurpose variable
  const PermissiblePurpose = req.body.PermissiblePurpose; // Define and initialize PermissiblePurpose
  const pid = req.body.pid // Define and initialize pid
  const license = req.body.license; // Define and initialize license
  const EnquiryReason = req.body.EnquiryReason; // Define and initialize userEmail
  const Reference = req.body.Reference; // Define and initialize userEmail
  const IDNumber = req.body.IDNumber; // Define and initialize userEmail
  const EnquiryDoneBy = req.body.EnquiryDoneBy; // Define and initialize userEmail


  const info = {
    Token:token,
    PermissiblePurpose: "Fraud Detection and Prevention",
    IDNumber: IDNumber,
    Reference: Reference,
    UseDHAExtra: "",
    UseSAFPSDirect:"",
    EnquiryReason: EnquiryReason,
    EnquiryDoneBy: EnquiryDoneBy,
    TemplateID:"3402",
    RawHTML: ""
  }

  console.log(info)

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const search = await axios.post(
      `${process.env.CPB_USER_TEST_URL}/wrapper/dynamic?verify=${process.env.CPB_TEST_VERIFY}`,
      info,
      config
    );

    if(search.status === 200){
      // Creating the search model
      createSearchModel(pid, project, title, uid, name, header, share, surname, restrictCost, currentTotal, PermissiblePurpose, search.data)
      //updateProjectModelSearch(restrictCost, uid, name, surname, header, pid, project, title, PermissiblePurpose, share, currentTotal)
      updateLicenseModelSearch(license, title, restrictCost) 
      
      await axios.post('http://localhost:5000/api/v1/exchange/send',{
        email: userEmail,
        from: `${name} ${surname}`,
        encodedPDF: search.data.Results[0].EncodedPDF,
        subject: 'Dynamic Report',
        message: 'Your Dynamic Report search was a success. Your search may be viewed in the Nexus Intelligence dashboard, where you may also explore other features at your Incoming Searches.'
      },config);

      res.status(200).send({
        success: true,
        message: "Your search has been conducted successfully, remeber to have a look at your incoming searches."
      })
    } else {
      return res.status(500).send({
        success: false,
        message: "Please make sure a project is selected before a search is done"
      });
    }
  } catch (err) {
    console.log(err);
    if (err.response && err.response.data) {
      // The request was made and the server responded with a status code
      if (err.response.status === 504) {
        return res.status(504).send({
          success: false,
          message: 'Please come back and try again later.'
        });
      }
      return res.status(500).send({
        success: false,
        message: err.response.data
      });
    } else if (err.request) {
      // The request was made but no response was received
      return res.status(500).send({
        success: false,
        message: 'No response received from server'
      });
    } else {
      // Something else happened in making the request that triggered the error
      return res.status(500).send({
        success: false,
        message: err
      });
    }
  }
};



/**
 * Controller function to search for a list of people using a third-party API.
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} next - Express next function
 * @returns {Promise<void>}
 */
 exports.idvlistpdf = async (req, res, next) => {
  // Extract the auth token from the request object.
  const token = req.authToken;

  const uid = req.body.uid; // Define and initialize uid variable
  const name = req.body.name; // Define and initialize name variable
  const header = req.body.header; // Define and initialize header variable
  const share = req.body.share; // Define and initialize share variable
  const surname = req.body.surname; // Define and initialize surname variable
  const restrictCost = req.body.restrictCost; // Define and initialize restrictCost variable
  const currentTotal = req.body.currentTotal; // Define and initialize currentTotal variable
  const project = req.body.project; // Define and initialize PermissiblePurpose variable
  const title = req.body.restrictionName; // Define and initialize PermissiblePurpose variable
  const PermissiblePurpose = req.body.PermissiblePurpose; // Define and initialize PermissiblePurpose
  const pid = req.body.pid // Define and initialize pid
  const license = req.body.license; // Define and initialize license
  const RegistrationNumber = req.body.RegistrationNumber; // Define and initialize userEmail
  const Reference = req.body.Reference; // Define and initialize userEmail
  const IDNumber = req.body.IDNumber; // Define and initialize userEmail
  const MaxCacheDays = req.body.MaxCacheDays; // Define and initialize userEmail


  const info = {
    Token:token,
    PermissiblePurpose: "Fraud Detection and Prevention",
    IDNumber: IDNumber,
    Reference: Reference,
    hasConsent: true,
    EnquiryReason: EnquiryReason,
    EnquiryType: "idvalidation",
  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const search = await axios.post(
      `${process.env.CPB_USER_TEST_URL}/wrapper/idvlistpdf?verify=${process.env.CPB_TEST_VERIFY}`,
      info,
      config
    );

    if(pid && search.status === 200){
      // Creating the search model
      createSearchModel(pid, project, title, uid, name, header, share, surname, restrictCost, currentTotal, PermissiblePurpose, search.data)
      //updateProjectModelSearch(restrictCost, uid, name, surname, header, pid, project, title, PermissiblePurpose, share, currentTotal)
      updateLicenseModelSearch(license, title, restrictCost)
      
      // await axios.post('/api/v1/exchange/send',{
      //   email: userEmail,
      //   from: `${name} ${surname}`,
      //   subject: 'Person Listing',
      //   message: 'Your Person Listing search has been successful.'
      // },config);

      res.status(200).send({
        success: true,
        message: "Your search has been conducted successfully, remeber to have a look at your incoming searches."
      })
    } else {
      return res.status(500).send({
        success: false,
        message: "Please make sure a project is selected before a search is done"
      });
    }
  } catch (err) {
    console.log(err)
    return res.status(500).send({
      success: false,
      message: 'Failed to conduct your search, please try again later, or get hold of our support team at nexusintelsupport@nexfor.co.za'
    });
  }
};

/**
 * Controller function to search for a list of people using a third-party API.
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} next - Express next function
 * @returns {Promise<void>}
 */
exports.cipcdirectorslist = async (req, res, next) => {
  // Extract the auth token from the request object.
  const token = req.authToken;

  const uid = req.body.uid; // Define and initialize uid variable
  const userEmail = req.body.userEmail; // Define and initialize userEmail
  const name = req.body.name; // Define and initialize name variable
  const header = req.body.header; // Define and initialize header variable
  const share = req.body.share; // Define and initialize share variable
  const surname = req.body.surname; // Define and initialize surname variable
  const restrictCost = req.body.restrictCost; // Define and initialize restrictCost variable
  const currentTotal = req.body.currentTotal; // Define and initialize currentTotal variable
  const project = req.body.project; // Define and initialize PermissiblePurpose variable
  const title = req.body.restrictionName; // Define and initialize PermissiblePurpose variable
  const PermissiblePurpose = req.body.PermissiblePurpose; // Define and initialize PermissiblePurpose
  const pid = req.body.pid // Define and initialize pid
  const license = req.body.license; // Define and initialize license
  const RegistrationNumber = req.body.RegistrationNumber; // Define and initialize userEmail
  const Reference = req.body.Reference; // Define and initialize userEmail
  const IDNumber = req.body.IDNumber; // Define and initialize userEmail


  const info = {
    Token:token,
    PermissiblePurpose: PermissiblePurpose,
    IDNumber: IDNumber,
    RegistrationNumber: RegistrationNumber,
    UseDHAExtra: "",
    Reference: Reference,
  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const search = await axios.post(
      `${process.env.CPB_USER_TEST_URL}/cipcdirectors/list?verify=${process.env.CPB_TEST_VERIFY}`,
      info,
      config
    );

    if(pid && search.status === 200){
      // Creating the search model
      createSearchModel(pid, project, title, uid, name, header, share, surname, restrictCost, currentTotal, PermissiblePurpose, search.data)
      //updateProjectModelSearch(restrictCost, uid, name, surname, header, pid, project, title, PermissiblePurpose, share, currentTotal, search.data)
      updateLicenseModelSearch(license, title, restrictCost)
      
      await axios.post('http://localhost:5000/api/v1/exchange/send',{
        email: userEmail,
        from: `${name} ${surname}`,
        subject: 'CIPC Director Listing',
        message: 'Your CIPC Director Listing search was a success. Your search may be viewed in the Nexus Intelligence dashboard, where you may also explore other features at your Incoming Searches.'
      },config);

      res.status(200).send({
        success: true,
        message: "Your search has been conducted successfully, remeber to have a look at your incoming searches."
      })
    } else {
      return res.status(500).send({
        success: false,
        message: "Please make sure a project is selected before a search is done"
      });
    }
  } catch (err) {
    console.log(err);
    if (err.response && err.response.data) {
      // The request was made and the server responded with a status code
      return res.status(500).send({
        success: false,
        message: err.response.data
      });
    } else if (err.request) {
      // The request was made but no response was received
      return res.status(500).send({
        success: false,
        message: 'No response received from server'
      });
    } else {
      // Something else happened in making the request that triggered the error
      return res.status(500).send({
        success: false,
        message: err
      });
    }
  }
};




/**
 * Controller function to search for a list of people using a third-party API.
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} next - Express next function
 * @returns {Promise<void>}
 */
 exports.procurementenquiry = async (req, res, next) => {
  // Extract the auth token from the request object.
  const token = req.authToken;

  const uid = req.body.uid; // Define and initialize uid variable
  const name = req.body.name; // Define and initialize name variable
  const userEmail = req.body.userEmail; // Define and initialize name variable
  const header = req.body.header; // Define and initialize header variable
  const share = req.body.share; // Define and initialize share variable
  const surname = req.body.surname; // Define and initialize surname variable
  const restrictCost = req.body.restrictCost; // Define and initialize restrictCost variable
  const currentTotal = req.body.currentTotal; // Define and initialize currentTotal variable
  const project = req.body.project; // Define and initialize PermissiblePurpose variable
  const title = req.body.restrictionName; // Define and initialize PermissiblePurpose variable
  const PermissiblePurpose = req.body.PermissiblePurpose; // Define and initialize PermissiblePurpose
  const pid = req.body.pid // Define and initialize pid
  const license = req.body.license; // Define and initialize license
  const RegistrationNumber = req.body.RegistrationNumber; // Define and initialize userEmail
  const Reference = req.body.Reference; // Define and initialize userEmail
  const IDNumber = req.body.IDNumber; // Define and initialize userEmail
  const EnquiryDoneBy = req.body.EnquiryDoneBy; // Define and initialize userEmail


  const info = {
    Token:token,
    PermissiblePurpose: "Fraud Detection and Prevention",
    Reference: Reference,
    RegistrationNumber: RegistrationNumber,
    InputCompany: IDNumber,
    EnquiryReason: "Fraud Detection and Prevention",
    EnquiryDoneBy: EnquiryDoneBy
  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const search = await axios.post(
      `${process.env.CPB_USER_TEST_URL}/wrapper/procurementreport?verify=${process.env.CPB_TEST_VERIFY}`,
      info,
      config
    );

    if(pid && search.status === 200){
      // Creating the search model
      createSearchModel(pid, project, title, uid, name, header, share, surname, restrictCost, currentTotal, PermissiblePurpose, search.data)
      //updateProjectModelSearch(restrictCost, uid, name, surname, header, pid, project, title, PermissiblePurpose, share, currentTotal)
      updateLicenseModelSearch(license, title, restrictCost)

      await axios.post('http://localhost:5000/api/v1/exchange/send',{
        email: userEmail,
        from: `${name} ${surname}`,
        encodedPDF: search.data.EncodedPDF,
        subject: 'Procurement Enquiry',
        message: 'Your Procurement Enquiry search was a success. Your search may be viewed in the Nexus Intelligence dashboard, where you may also explore other features at your Incoming Searches.'
      },config);

      res.status(200).send({
        success: true,
        message: "Your search has been conducted successfully, remeber to have a look at your incoming searches."
      })
    } else {
      return res.status(500).send({
        success: false,
        message: "Please make sure a project is selected before a search is done"
      });
    }
  } catch (err) {
    console.log(err);
    if (err.response && err.response.data) {
      // The request was made and the server responded with a status code
      return res.status(500).send({
        success: false,
        message: err.response.data
      });
    } else if (err.request) {
      // The request was made but no response was received
      return res.status(500).send({
        success: false,
        message: 'No response received from server'
      });
    } else {
      // Something else happened in making the request that triggered the error
      return res.status(500).send({
        success: false,
        message: err
      });
    }
  }
};


/**
 * Controller function to search for a list of people using a third-party API.
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} next - Express next function
 * @returns {Promise<void>}
 */
 exports.spiderweb = async (req, res, next) => {
  // Extract the auth token from the request object.
  const token = req.authToken;

  const uid = req.body.uid; // Define and initialize uid variable
  const name = req.body.name; // Define and initialize name variable
  const userEmail = req.body.userEmail; // Define and initialize name variable
  const header = req.body.header; // Define and initialize header variable
  const share = req.body.share; // Define and initialize share variable
  const surname = req.body.surname; // Define and initialize surname variable
  const restrictCost = req.body.restrictCost; // Define and initialize restrictCost variable
  const currentTotal = req.body.currentTotal; // Define and initialize currentTotal variable
  const project = req.body.project; // Define and initialize PermissiblePurpose variable
  const title = req.body.restrictionName; // Define and initialize PermissiblePurpose variable
  const PermissiblePurpose = req.body.PermissiblePurpose; // Define and initialize PermissiblePurpose
  const pid = req.body.pid // Define and initialize pid
  const license = req.body.license; // Define and initialize license
  const PrimaryIDNumber = req.body.PrimaryIDNumber; // Define and initialize userEmail
  const Reference = req.body.Reference; // Define and initialize userEmail
  const SecondaryIDNumber = req.body.SecondaryIDNumber; // Define and initialize userEmail
  const EnquiryDoneBy = req.body.EnquiryDoneBy; // Define and initialize userEmail


  const info = {
    Token:token,
    PermissiblePurpose: "Fraud Detection and Prevention",
    Reference: Reference,
    PrimaryIDNumber: PrimaryIDNumber,
    SecondaryIDNumber: SecondaryIDNumber,
    SearchCriteria: "",
  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const search = await axios.post(
      `${process.env.CPB_USER_TEST_URL}/spiderwebrelationship/list?verify=${process.env.CPB_TEST_VERIFY}`,
      info,
      config
    );

    if(pid && search.status === 200){
      // Creating the search model
      createSearchModel(pid, project, title, uid, name, header, share, surname, restrictCost, currentTotal, PermissiblePurpose, search.data)
      //updateProjectModelSearch(restrictCost, uid, name, surname, header, pid, project, title, PermissiblePurpose, share, currentTotal)
      updateLicenseModelSearch(license, title, restrictCost)

      await axios.post('http://localhost:5000/api/v1/exchange/send',{
        email: userEmail,
        from: `${name} ${surname}`,
        encodedPDF: search.data.EncodedPDF,
        subject: 'Spiderwebrelationship Listing',
        message: 'Your Spiderwebrelationship Listing search was a success. Your search may be viewed in the Nexus Intelligence dashboard, where you may also explore other features at your Incoming Searches.'
      },config);

      res.status(200).send({
        success: true,
        message: "Your search has been conducted successfully, remeber to have a look at your incoming searches."
      })
    } else {
      return res.status(500).send({
        success: false,
        message: "Please make sure a project is selected before a search is done"
      });
    }
  } catch (err) {
    console.log(err);
    if (err.response && err.response.data) {
      // The request was made and the server responded with a status code
      return res.status(500).send({
        success: false,
        message: err.response.data
      });
    } else if (err.request) {
      // The request was made but no response was received
      return res.status(500).send({
        success: false,
        message: 'No response received from server'
      });
    } else {
      // Something else happened in making the request that triggered the error
      return res.status(500).send({
        success: false,
        message: err
      });
    }
  }
};

/**
 * Controller function to search for a list of people using a third-party API.
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} next - Express next function
 * @returns {Promise<void>}
 */
 exports.enterpriseriskreport = async (req, res, next) => {
  // Extract the auth token from the request object.
  const token = req.authToken;

  const uid = req.body.uid; // Define and initialize uid variable
  const name = req.body.name; // Define and initialize name variable
  const userEmail = req.body.userEmail; // Define and initialize name variable
  const header = req.body.header; // Define and initialize header variable
  const share = req.body.share; // Define and initialize share variable
  const surname = req.body.surname; // Define and initialize surname variable
  const restrictCost = req.body.restrictCost; // Define and initialize restrictCost variable
  const currentTotal = req.body.currentTotal; // Define and initialize currentTotal variable
  const project = req.body.project; // Define and initialize PermissiblePurpose variable
  const title = req.body.restrictionName; // Define and initialize PermissiblePurpose variable
  const PermissiblePurpose = req.body.PermissiblePurpose; // Define and initialize PermissiblePurpose
  const pid = req.body.pid // Define and initialize pid
  const license = req.body.license; // Define and initialize license
  const RegistrationNumber = req.body.RegistrationNumber; // Define and initialize userEmail
  const Reference = req.body.Reference; // Define and initialize userEmail
  const SecondaryIDNumber = req.body.SecondaryIDNumber; // Define and initialize userEmail
  const EnquiryDoneBy = req.body.EnquiryDoneBy; // Define and initialize userEmail


  const info = {
    Token:token,
    PermissiblePurpose: "Fraud Detection and Prevention",
    Reference: Reference,
    RegistrationNumber: RegistrationNumber,
    EnquiryDoneBy: EnquiryDoneBy,
    UseDHAExtra: "",
    UseSAFPSDirect: "",
    RawHTML: "",
    EnquiryReason: "Fraud Detection and Prevention",

  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const search = await axios.post(
      `${process.env.CPB_USER_TEST_URL}/dynamicwrapper/enterprise-risk-report?verify=${process.env.CPB_TEST_VERIFY}`,
      info,
      config
    );

    if(pid && search.status === 200){
      // Creating the search model
      createSearchModel(pid, project, title, uid, name, header, share, surname, restrictCost, currentTotal, PermissiblePurpose, search.data)
      //updateProjectModelSearch(restrictCost, uid, name, surname, header, pid, project, title, PermissiblePurpose, share, currentTotal)
      updateLicenseModelSearch(license, title, restrictCost)

      await axios.post('http://localhost:5000/api/v1/exchange/send',{
        email: userEmail,
        from: `${name} ${surname}`,
        encodedPDF: search.data.EncodedPDF,
        subject: 'Enterprise Risk Report',
        message: 'Your Enterprise Risk Report search was a success. Your search may be viewed in the Nexus Intelligence dashboard, where you may also explore other features at your Incoming Searches.'
      },config);

      res.status(200).send({
        success: true,
        message: "Your search has been conducted successfully, remeber to have a look at your incoming searches."
      })
    } else {
      return res.status(500).send({
        success: false,
        message: "Please make sure a project is selected before a search is done"
      });
    }
  } catch (err) {
    console.log(err);
    if (err.response && err.response.data) {
      // The request was made and the server responded with a status code
      return res.status(500).send({
        success: false,
        message: err.response.data
      });
    } else if (err.request) {
      // The request was made but no response was received
      return res.status(500).send({
        success: false,
        message: 'No response received from server'
      });
    } else {
      // Something else happened in making the request that triggered the error
      return res.status(500).send({
        success: false,
        message: err
      });
    }
  }
};


/**
 * Controller function to search for a list of people using a third-party API.
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} next - Express next function
 * @returns {Promise<void>}
 */
 exports.creditenquiry = async (req, res, next) => {
  // Extract the auth token from the request object.
  const token = req.authToken;

  const uid = req.body.uid; // Define and initialize uid variable
  const name = req.body.name; // Define and initialize name variable
  const userEmail = req.body.userEmail; // Define and initialize name variable
  const header = req.body.header; // Define and initialize header variable
  const share = req.body.share; // Define and initialize share variable
  const surname = req.body.surname; // Define and initialize surname variable
  const restrictCost = req.body.restrictCost; // Define and initialize restrictCost variable
  const currentTotal = req.body.currentTotal; // Define and initialize currentTotal variable
  const project = req.body.project; // Define and initialize PermissiblePurpose variable
  const title = req.body.restrictionName; // Define and initialize PermissiblePurpose variable
  const PermissiblePurpose = req.body.PermissiblePurpose; // Define and initialize PermissiblePurpose
  const pid = req.body.pid // Define and initialize pid
  const license = req.body.license; // Define and initialize license
  const IDNumber = req.body.IDNumber; // Define and initialize userEmail
  const Reference = req.body.Reference; // Define and initialize userEmail
  const SecondaryIDNumber = req.body.SecondaryIDNumber; // Define and initialize userEmail
  const EnquiryDoneBy = req.body.EnquiryDoneBy; // Define and initialize userEmail


  const info = {
    Token:token,
    PermissiblePurpose: "Fraud Detection and Prevention",
    Reference: Reference,
    IDNumber: IDNumber,
    EnquiryDoneBy: EnquiryDoneBy,
    UseDHAExtra: "",
    UseSAFPSDirect: "",
    RawHTML: "",
    EnquiryReason: "Fraud Detection and Prevention",

  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const search = await axios.post(
      `${process.env.CPB_USER_TEST_URL}/dynamicwrapper/credit-enquiry?verify=${process.env.CPB_TEST_VERIFY}`,
      info,
      config
    );

    if(pid && search.status === 200){
      // Creating the search model
      createSearchModel(pid, project, title, uid, name, header, share, surname, restrictCost, currentTotal, PermissiblePurpose, search.data)
      //updateProjectModelSearch(restrictCost, uid, name, surname, header, pid, project, title, PermissiblePurpose, share, currentTotal)
      updateLicenseModelSearch(license, title, restrictCost)

      await axios.post('http://localhost:5000/api/v1/exchange/send',{
        email: userEmail,
        from: `${name} ${surname}`,
        encodedPDF: search.data.EncodedPDF,
        subject: 'Credit Enquiry',
        message: 'Your Credit Enquiry search was a success. Your search may be viewed in the Nexus Intelligence dashboard, where you may also explore other features at your Incoming Searches.'
      },config);

      res.status(200).send({
        success: true,
        message: "Your search has been conducted successfully, remeber to have a look at your incoming searches."
      })
    } else {
      return res.status(500).send({
        success: false,
        message: "Please make sure a project is selected before a search is done"
      });
    }
  } catch (err) {
    console.log(err);
    if (err.response && err.response.data) {
      // The request was made and the server responded with a status code
      return res.status(500).send({
        success: false,
        message: err.response.data
      });
    } else if (err.request) {
      // The request was made but no response was received
      return res.status(500).send({
        success: false,
        message: 'No response received from server'
      });
    } else {
      // Something else happened in making the request that triggered the error
      return res.status(500).send({
        success: false,
        message: err
      });
    }
  }
};


/**
 * Controller function to search for a list of people using a third-party API.
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} next - Express next function
 * @returns {Promise<void>}
 */
 exports.idvkyc = async (req, res, next) => {
  // Extract the auth token from the request object.
  const token = req.authToken;

  const uid = req.body.uid; // Define and initialize uid variable
  const name = req.body.name; // Define and initialize name variable
  const userEmail = req.body.userEmail; // Define and initialize name variable
  const header = req.body.header; // Define and initialize header variable
  const share = req.body.share; // Define and initialize share variable
  const surname = req.body.surname; // Define and initialize surname variable
  const restrictCost = req.body.restrictCost; // Define and initialize restrictCost variable
  const currentTotal = req.body.currentTotal; // Define and initialize currentTotal variable
  const project = req.body.project; // Define and initialize PermissiblePurpose variable
  const title = req.body.restrictionName; // Define and initialize PermissiblePurpose variable
  const PermissiblePurpose = req.body.PermissiblePurpose; // Define and initialize PermissiblePurpose
  const pid = req.body.pid // Define and initialize pid
  const license = req.body.license; // Define and initialize license
  const IDNumber = req.body.IDNumber; // Define and initialize userEmail
  const Reference = req.body.Reference; // Define and initialize userEmail
  const IKTemplateID = req.body.IKTemplateID; // Define and initialize userEmail
  const EnquiryDoneBy = req.body.EnquiryDoneBy; // Define and initialize userEmail
  const InputPerson = req.body.InputPerson;
  const InputAddress = req.body.InputAddress;
  const InputTelephone = req.body.InputTelephone;
  const InputEmail = req.body.InputEmail;
  const InputEmployer = req.body.InputEmployer;

  const info = {
    Token:token,
    PermissiblePurpose: "Fraud Detection and Prevention",
    Reference: Reference,
    IDNumber: IDNumber,
    IKTemplateID: IKTemplateID,
    InputPerson: InputPerson,
    InputAddress: InputAddress,
    InputTelephone: InputTelephone,
    InputEmail: InputEmail,
    InputEmployer: InputEmployer,
    EnquiryDoneBy: EnquiryDoneBy,
    UseDHAExtra: "",
    UseSAFPSDirect: "",
    RawHTML: "",
    EnquiryReason: "Fraud Detection and Prevention",

  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const search = await axios.post(
      `${process.env.CPB_USER_TEST_URL}/dynamicwrapper/individual-kyc?verify=${process.env.CPB_TEST_VERIFY}`,
      info,
      config
    );

    if(pid && search.status === 200){
      // Creating the search model
      createSearchModel(pid, project, title, uid, name, header, share, surname, restrictCost, currentTotal, PermissiblePurpose, search.data)
      //updateProjectModelSearch(restrictCost, uid, name, surname, header, pid, project, title, PermissiblePurpose, share, currentTotal)
      updateLicenseModelSearch(license, title, restrictCost)

      await axios.post('http://localhost:5000/api/v1/exchange/send',{
        email: userEmail,
        from: `${name} ${surname}`,
        encodedPDF: search.data.EncodedPDF,
        subject: 'Individual KYC',
        message: 'Your Individual KYC search was a success. Your search may be viewed in the Nexus Intelligence dashboard, where you may also explore other features at your Incoming Searches.'
      },config);

      res.status(200).send({
        success: true,
        message: "Your search has been conducted successfully, remeber to have a look at your incoming searches."
      })
    } else {
      return res.status(500).send({
        success: false,
        message: "Please make sure a project is selected before a search is done"
      });
    }
  } catch (err) {
    console.log(err);
    if (err.response && err.response.data) {
      // The request was made and the server responded with a status code
      return res.status(500).send({
        success: false,
        message: err.response.data
      });
    } else if (err.request) {
      // The request was made but no response was received
      return res.status(500).send({
        success: false,
        message: 'No response received from server'
      });
    } else {
      // Something else happened in making the request that triggered the error
      return res.status(500).send({
        success: false,
        message: err
      });
    }
  }
};



/**
 * Controller function to search for a list of people using a third-party API.
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} next - Express next function
 * @returns {Promise<void>}
 */
 exports.traceenquiry = async (req, res, next) => {
  // Extract the auth token from the request object.
  const token = req.authToken;

  const uid = req.body.uid; // Define and initialize uid variable
  const name = req.body.name; // Define and initialize name variable
  const userEmail = req.body.userEmail; // Define and initialize name variable
  const header = req.body.header; // Define and initialize header variable
  const share = req.body.share; // Define and initialize share variable
  const surname = req.body.surname; // Define and initialize surname variable
  const restrictCost = req.body.restrictCost; // Define and initialize restrictCost variable
  const currentTotal = req.body.currentTotal; // Define and initialize currentTotal variable
  const project = req.body.project; // Define and initialize PermissiblePurpose variable
  const title = req.body.restrictionName; // Define and initialize PermissiblePurpose variable
  const PermissiblePurpose = req.body.PermissiblePurpose; // Define and initialize PermissiblePurpose
  const pid = req.body.pid // Define and initialize pid
  const license = req.body.license; // Define and initialize license
  const IDNumber = req.body.IDNumber; // Define and initialize userEmail
  const Reference = req.body.Reference; // Define and initialize userEmail
  const EnquiryDoneBy = req.body.EnquiryDoneBy; // Define and initialize userEmail

  const info = {
    Token:token,
    PermissiblePurpose: "Fraud Detection and Prevention",
    Reference: Reference,
    IDNumber: IDNumber,
    EnquiryDoneBy: EnquiryDoneBy,
    UseDHAExtra: "",
    UseSAFPSDirect: "",
    RawHTML: "",
    EnquiryReason: "Fraud Detection and Prevention",

  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const search = await axios.post(
      `${process.env.CPB_USER_TEST_URL}/dynamicwrapper/trace-enquiry?verify=${process.env.CPB_TEST_VERIFY}`,
      info,
      config
    );

    if(pid && search.status === 200){
      // Creating the search model
      createSearchModel(pid, project, title, uid, name, header, share, surname, restrictCost, currentTotal, PermissiblePurpose, search.data)
      //updateProjectModelSearch(restrictCost, uid, name, surname, header, pid, project, title, PermissiblePurpose, share, currentTotal)
      updateLicenseModelSearch(license, title, restrictCost)

      await axios.post('http://localhost:5000/api/v1/exchange/send',{
        email: userEmail,
        from: `${name} ${surname}`,
        encodedPDF: search.data.EncodedPDF,
        subject: 'Trace Enquiry',
        message: 'Your Trace Enquiry search was a success. Your search may be viewed in the Nexus Intelligence dashboard, where you may also explore other features at your Incoming Searches.'
      },config);

      res.status(200).send({
        success: true,
        message: "Your search has been conducted successfully, remeber to have a look at your incoming searches."
      })
    } else {
      return res.status(500).send({
        success: false,
        message: "Please make sure a project is selected before a search is done"
      });
    }
  } catch (err) {
    console.log(err);
    if (err.response && err.response.data) {
      // The request was made and the server responded with a status code
      return res.status(500).send({
        success: false,
        message: err.response.data
      });
    } else if (err.request) {
      // The request was made but no response was received
      return res.status(500).send({
        success: false,
        message: 'No response received from server'
      });
    } else {
      // Something else happened in making the request that triggered the error
      return res.status(500).send({
        success: false,
        message: err
      });
    }
  }
};


/**
 * Controller function to search for a list of people using a third-party API.
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} next - Express next function
 * @returns {Promise<void>}
 */
 exports.trustenquiry = async (req, res, next) => {
  // Extract the auth token from the request object.
  const token = req.authToken;

  const uid = req.body.uid; // Define and initialize uid variable
  const name = req.body.name; // Define and initialize name variable
  const userEmail = req.body.userEmail; // Define and initialize name variable
  const header = req.body.header; // Define and initialize header variable
  const share = req.body.share; // Define and initialize share variable
  const surname = req.body.surname; // Define and initialize surname variable
  const restrictCost = req.body.restrictCost; // Define and initialize restrictCost variable
  const currentTotal = req.body.currentTotal; // Define and initialize currentTotal variable
  const project = req.body.project; // Define and initialize PermissiblePurpose variable
  const title = req.body.restrictionName; // Define and initialize PermissiblePurpose variable
  const PermissiblePurpose = req.body.PermissiblePurpose; // Define and initialize PermissiblePurpose
  const pid = req.body.pid // Define and initialize pid
  const license = req.body.license; // Define and initialize license
  const IDNumber = req.body.IDNumber; // Define and initialize userEmail
  const Reference = req.body.Reference; // Define and initialize userEmail
  const EnquiryDoneBy = req.body.EnquiryDoneBy; // Define and initialize userEmail
  const TrustName = req.body.TrustName;
  const TrustNumber = req.body.TrustNumber;

  const info = {
    Token:token,
    PermissiblePurpose: "Fraud Detection and Prevention",
    Reference: Reference,
    IDNumber: IDNumber,
    TrustName: TrustName,
    TrustNumber: TrustNumber,
    EnquiryDoneBy: EnquiryDoneBy,
    UseDHAExtra: "",
    UseSAFPSDirect: "",
    RawHTML: "",
    EnquiryReason: "Fraud Detection and Prevention",

  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const search = await axios.post(
      `${process.env.CPB_USER_TEST_URL}/dynamicwrapper/trust-enquiry?verify=${process.env.CPB_TEST_VERIFY}`,
      info,
      config
    );

    if(pid && search.status === 200){
      // Creating the search model
      createSearchModel(pid, project, title, uid, name, header, share, surname, restrictCost, currentTotal, PermissiblePurpose, search.data)
      //updateProjectModelSearch(restrictCost, uid, name, surname, header, pid, project, title, PermissiblePurpose, share, currentTotal)
      updateLicenseModelSearch(license, title, restrictCost)

      await axios.post('http://localhost:5000/api/v1/exchange/send',{
        email: userEmail,
        from: `${name} ${surname}`,
        encodedPDF: search.data.EncodedPDF,
        subject: 'Trust Enquiry',
        message: 'Your Trust Enquiry search was a success. Your search may be viewed in the Nexus Intelligence dashboard, where you may also explore other features at your Incoming Searches.'
      },config);

      res.status(200).send({
        success: true,
        message: "Your search has been conducted successfully, remeber to have a look at your incoming searches."
      })
    } else {
      return res.status(500).send({
        success: false,
        message: "Please make sure a project is selected before a search is done"
      });
    }
  } catch (err) {
    console.log(err);
    if (err.response && err.response.data) {
      // The request was made and the server responded with a status code
      return res.status(500).send({
        success: false,
        message: err.response.data
      });
    } else if (err.request) {
      // The request was made but no response was received
      return res.status(500).send({
        success: false,
        message: 'No response received from server'
      });
    } else {
      // Something else happened in making the request that triggered the error
      return res.status(500).send({
        success: false,
        message: err
      });
    }
  }
};


/**
 * Controller function to search for a list of people using a third-party API.
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} next - Express next function
 * @returns {Promise<void>}
 */
 exports.deedsenquiry = async (req, res, next) => {
  // Extract the auth token from the request object.
  const token = req.authToken;

  const uid = req.body.uid; // Define and initialize uid variable
  const name = req.body.name; // Define and initialize name variable
  const userEmail = req.body.userEmail; // Define and initialize name variable
  const header = req.body.header; // Define and initialize header variable
  const share = req.body.share; // Define and initialize share variable
  const surname = req.body.surname; // Define and initialize surname variable
  const restrictCost = req.body.restrictCost; // Define and initialize restrictCost variable
  const currentTotal = req.body.currentTotal; // Define and initialize currentTotal variable
  const project = req.body.project; // Define and initialize PermissiblePurpose variable
  const title = req.body.restrictionName; // Define and initialize PermissiblePurpose variable
  const PermissiblePurpose = req.body.PermissiblePurpose; // Define and initialize PermissiblePurpose
  const pid = req.body.pid // Define and initialize pid
  const license = req.body.license; // Define and initialize license
  const IDNumber = req.body.IDNumber; // Define and initialize userEmail
  const Reference = req.body.Reference; // Define and initialize userEmail
  const EnquiryDoneBy = req.body.EnquiryDoneBy; // Define and initialize userEmail
  const TitleDeedNumber = req.body.TitleDeedNumber;
  const Registrar = req.body.Registrar;

  const info = {
    Token:token,
    PermissiblePurpose: "Fraud Detection and Prevention",
    Reference: Reference,
    IDNumber: IDNumber,
    TitleDeedNumber: TitleDeedNumber,
    Registrar: Registrar,
    EnquiryDoneBy: EnquiryDoneBy,
    UseDHAExtra: "",
    UseSAFPSDirect: "",
    RawHTML: "",
    EnquiryReason: "Fraud Detection and Prevention",

  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const search = await axios.post(
      `${process.env.CPB_USER_TEST_URL}/dynamicwrapper/deeds-enquiry?verify=${process.env.CPB_TEST_VERIFY}`,
      info,
      config
    );

    if(pid && search.status === 200){
      // Creating the search model
      createSearchModel(pid, project, title, uid, name, header, share, surname, restrictCost, currentTotal, PermissiblePurpose, search.data)
      //updateProjectModelSearch(restrictCost, uid, name, surname, header, pid, project, title, PermissiblePurpose, share, currentTotal)
      updateLicenseModelSearch(license, title, restrictCost)

      await axios.post('http://localhost:5000/api/v1/exchange/send',{
        email: userEmail,
        from: `${name} ${surname}`,
        encodedPDF: search.data.EncodedPDF,
        subject: 'Deeds Enquiry',
        message: 'Your Deeds Enquiry search was a success. Your search may be viewed in the Nexus Intelligence dashboard, where you may also explore other features at your Incoming Searches.'
      },config);

      res.status(200).send({
        success: true,
        message: "Your search has been conducted successfully, remeber to have a look at your incoming searches."
      })
    } else {
      return res.status(500).send({
        success: false,
        message: "Please make sure a project is selected before a search is done"
      });
    }
  } catch (err) {
    console.log(err);
    if (err.response && err.response.data) {
      // The request was made and the server responded with a status code
      return res.status(500).send({
        success: false,
        message: err.response.data
      });
    } else if (err.request) {
      // The request was made but no response was received
      return res.status(500).send({
        success: false,
        message: 'No response received from server'
      });
    } else {
      // Something else happened in making the request that triggered the error
      return res.status(500).send({
        success: false,
        message: err
      });
    }
  }
};


/**
 * Controller function to search for a list of people using a third-party API.
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} next - Express next function
 * @returns {Promise<void>}
 */
 exports.idvenquiry = async (req, res, next) => {
  // Extract the auth token from the request object.
  const token = req.authToken;

  const uid = req.body.uid; // Define and initialize uid variable
  const name = req.body.name; // Define and initialize name variable
  const userEmail = req.body.userEmail; // Define and initialize name variable
  const header = req.body.header; // Define and initialize header variable
  const share = req.body.share; // Define and initialize share variable
  const surname = req.body.surname; // Define and initialize surname variable
  const restrictCost = req.body.restrictCost; // Define and initialize restrictCost variable
  const currentTotal = req.body.currentTotal; // Define and initialize currentTotal variable
  const project = req.body.project; // Define and initialize PermissiblePurpose variable
  const title = req.body.restrictionName; // Define and initialize PermissiblePurpose variable
  const PermissiblePurpose = req.body.PermissiblePurpose; // Define and initialize PermissiblePurpose
  const pid = req.body.pid // Define and initialize pid
  const license = req.body.license; // Define and initialize license
  const IDNumber = req.body.IDNumber; // Define and initialize userEmail
  const Reference = req.body.Reference; // Define and initialize userEmail
  const EnquiryDoneBy = req.body.EnquiryDoneBy; // Define and initialize userEmail

  const info = {
    Token:token,
    PermissiblePurpose: "Fraud Detection and Prevention",
    Reference: Reference,
    IDNumber: IDNumber,
    EnquiryDoneBy: EnquiryDoneBy,
    UseDHAExtra: "",
    UseSAFPSDirect: "",
    RawHTML: "",
    EnquiryReason: "Fraud Detection and Prevention",

  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const search = await axios.post(
      `${process.env.CPB_USER_TEST_URL}/dynamicwrapper/idv-enquiry?verify=${process.env.CPB_TEST_VERIFY}`,
      info,
      config
    );

    if(pid && search.status === 200){
      // Creating the search model
      createSearchModel(pid, project, title, uid, name, header, share, surname, restrictCost, currentTotal, PermissiblePurpose, search.data)
      //updateProjectModelSearch(restrictCost, uid, name, surname, header, pid, project, title, PermissiblePurpose, share, currentTotal)
      updateLicenseModelSearch(license, title, restrictCost)

      await axios.post('http://localhost:5000/api/v1/exchange/send',{
        email: userEmail,
        from: `${name} ${surname}`,
        encodedPDF: search.data.EncodedPDF,
        subject: 'IDV Enquiry',
        message: 'Your IDV Enquiry search was a success. Your search may be viewed in the Nexus Intelligence dashboard, where you may also explore other features at your Incoming Searches.'
      },config);

      res.status(200).send({
        success: true,
        message: "Your search has been conducted successfully, remeber to have a look at your incoming searches."
      })
    } else {
      return res.status(500).send({
        success: false,
        message: "Please make sure a project is selected before a search is done"
      });
    }
  } catch (err) {
    console.log(err);
    if (err.response && err.response.data) {
      // The request was made and the server responded with a status code
      return res.status(500).send({
        success: false,
        message: err.response.data
      });
    } else if (err.request) {
      // The request was made but no response was received
      return res.status(500).send({
        success: false,
        message: 'No response received from server'
      });
    } else {
      // Something else happened in making the request that triggered the error
      return res.status(500).send({
        success: false,
        message: err
      });
    }
  }
};


/**
 * Controller function to search for a list of people using a third-party API.
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} next - Express next function
 * @returns {Promise<void>}
 */
 exports.companykyc = async (req, res, next) => {
  // Extract the auth token from the request object.
  const token = req.authToken;

  const uid = req.body.uid; // Define and initialize uid variable
  const name = req.body.name; // Define and initialize name variable
  const userEmail = req.body.userEmail; // Define and initialize name variable
  const header = req.body.header; // Define and initialize header variable
  const share = req.body.share; // Define and initialize share variable
  const surname = req.body.surname; // Define and initialize surname variable
  const restrictCost = req.body.restrictCost; // Define and initialize restrictCost variable
  const currentTotal = req.body.currentTotal; // Define and initialize currentTotal variable
  const project = req.body.project; // Define and initialize PermissiblePurpose variable
  const title = req.body.restrictionName; // Define and initialize PermissiblePurpose variable
  const PermissiblePurpose = req.body.PermissiblePurpose; // Define and initialize PermissiblePurpose
  const pid = req.body.pid // Define and initialize pid
  const license = req.body.license; // Define and initialize license
  const IDNumber = req.body.IDNumber; // Define and initialize userEmail
  const Reference = req.body.Reference; // Define and initialize userEmail
  const EnquiryDoneBy = req.body.EnquiryDoneBy; // Define and initialize userEmail
  const RegistrationNumber = req.body.RegistrationNumber;
  const IKTemplateID = req.body.IKTemplateID;
  const CompanyTemplateID = req.body.CompanyTemplateID;
  const InputCompany = req.body.InputCompany;
  const InputDirectorList = req.body.InputDirectorList;
  const InputAccountablePartyList = req.body.InputAccountablePartyList;

  const info = {
    Token:token,
    PermissiblePurpose: "Fraud Detection and Prevention",
    Reference: Reference,
    RegistrationNumber: RegistrationNumber,
    IKTemplateID: IKTemplateID,
    CompanyTemplateID: CompanyTemplateID,
    InputCompany: InputCompany,
    InputDirectorList: InputDirectorList,
    InputAccountablePartyList: InputAccountablePartyList,
    EnquiryDoneBy: EnquiryDoneBy,
    UseDHAExtra: "",
    UseSAFPSDirect: "",
    RawHTML: "",
    EnquiryReason: "Fraud Detection and Prevention",

  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const search = await axios.post(
      `${process.env.CPB_USER_TEST_URL}/dynamicwrapper/company-kyc?verify=${process.env.CPB_TEST_VERIFY}`,
      info,
      config
    );

    if(pid && search.status === 200){
      // Creating the search model
      createSearchModel(pid, project, title, uid, name, header, share, surname, restrictCost, currentTotal, PermissiblePurpose, search.data)
      //updateProjectModelSearch(restrictCost, uid, name, surname, header, pid, project, title, PermissiblePurpose, share, currentTotal)
      updateLicenseModelSearch(license, title, restrictCost)

      await axios.post('http://localhost:5000/api/v1/exchange/send',{
        email: userEmail,
        from: `${name} ${surname}`,
        encodedPDF: search.data.EncodedPDF,
        subject: 'Company KYC',
        message: 'Your Company KYC search was a success. Your search may be viewed in the Nexus Intelligence dashboard, where you may also explore other features at your Incoming Searches.'
      },config);

      res.status(200).send({
        success: true,
        message: "Your search has been conducted successfully, remeber to have a look at your incoming searches."
      })
    } else {
      return res.status(500).send({
        success: false,
        message: "Please make sure a project is selected before a search is done"
      });
    }
  } catch (err) {
    console.log(err);
    if (err.response && err.response.data) {
      // The request was made and the server responded with a status code
      return res.status(500).send({
        success: false,
        message: err.response.data
      });
    } else if (err.request) {
      // The request was made but no response was received
      return res.status(500).send({
        success: false,
        message: 'No response received from server'
      });
    } else {
      // Something else happened in making the request that triggered the error
      return res.status(500).send({
        success: false,
        message: err
      });
    }
  }
};

/**
 * Controller function to search for a list of people using a third-party API.
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} next - Express next function
 * @returns {Promise<void>}
 */
 exports.eagleeye = async (req, res, next) => {
  // Extract the auth token from the request object.
  const token = req.authToken;

  const uid = req.body.uid; // Define and initialize uid variable
  const name = req.body.name; // Define and initialize name variable
  const userEmail = req.body.userEmail; // Define and initialize name variable
  const header = req.body.header; // Define and initialize header variable
  const share = req.body.share; // Define and initialize share variable
  const surname = req.body.surname; // Define and initialize surname variable
  const restrictCost = req.body.restrictCost; // Define and initialize restrictCost variable
  const currentTotal = req.body.currentTotal; // Define and initialize currentTotal variable
  const project = req.body.project; // Define and initialize PermissiblePurpose variable
  const title = req.body.restrictionName; // Define and initialize PermissiblePurpose variable
  const PermissiblePurpose = req.body.PermissiblePurpose; // Define and initialize PermissiblePurpose
  const pid = req.body.pid // Define and initialize pid
  const license = req.body.license; // Define and initialize license
  const IDNumber = req.body.IDNumber; // Define and initialize userEmail
  const Reference = req.body.Reference; // Define and initialize userEmail
  const EnquiryDoneBy = req.body.EnquiryDoneBy; // Define and initialize userEmail

  const info = {
    Token:token,
    PermissiblePurpose: "Fraud Detection and Prevention",
    Reference: Reference,
    IDNumber: IDNumber,
    EnquiryDoneBy: EnquiryDoneBy,
    UseDHAExtra: "",
    UseSAFPSDirect: "",
    RawHTML: "",
    EnquiryReason: "Fraud Detection and Prevention",

  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const search = await axios.post(
      `${process.env.CPB_USER_TEST_URL}/dynamicwrapper/eagle-eye?verify=${process.env.CPB_TEST_VERIFY}`,
      info,
      config
    );

    if(pid && search.status === 200){
      // Creating the search model
      createSearchModel(pid, project, title, uid, name, header, share, surname, restrictCost, currentTotal, PermissiblePurpose, search.data)
      //updateProjectModelSearch(restrictCost, uid, name, surname, header, pid, project, title, PermissiblePurpose, share, currentTotal)
      updateLicenseModelSearch(license, title, restrictCost)

      await axios.post('http://localhost:5000/api/v1/exchange/send',{
        email: userEmail,
        from: `${name} ${surname}`,
        encodedPDF: search.data.EncodedPDF,
        subject: 'Eagle Eye',
        message: 'Your Eagle Eye search was a success. Your search may be viewed in the Nexus Intelligence dashboard, where you may also explore other features at your Incoming Searches.'
      },config);

      res.status(200).send({
        success: true,
        message: "Your search has been conducted successfully, remeber to have a look at your incoming searches."
      })
    } else {
      return res.status(500).send({
        success: false,
        message: "Please make sure a project is selected before a search is done"
      });
    }
  } catch (err) {
    console.log(err);
    if (err.response && err.response.data) {
      // The request was made and the server responded with a status code
      return res.status(500).send({
        success: false,
        message: err.response.data
      });
    } else if (err.request) {
      // The request was made but no response was received
      return res.status(500).send({
        success: false,
        message: 'No response received from server'
      });
    } else {
      // Something else happened in making the request that triggered the error
      return res.status(500).send({
        success: false,
        message: err
      });
    }
  }
};