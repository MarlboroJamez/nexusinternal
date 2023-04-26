const axios = require('axios');
const schedule = require('node-schedule');
const uuid = require('uuid');

// Models
const ScheduleModel = require('../../../../models/cpb/Scheduled');

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
exports.getscheduledsearches = async (req, res, next) => {
    const {uid} = req.body;

    try {
        const scheduledSearches =  await ScheduleModel.find({user: uid});
        
        return res.status(200).send({
            data: scheduledSearches
        });
    } catch (err) {
        console.log(err)
        return res.status(500).send({
          success: false,
          message: 'Failed to fetch scheduled searches, if this issue persists contact us at nexusintelsupport@nexfor.co.za'
        });
    }
}


/**
 * Controller function to search for a list of people using a third-party API.
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} next - Express next function
 * @returns {Promise<void>}
 */
exports.cancelscheduledsearch = async (req, res, next) => {
    const {jobId, codeStatus} = req.body;

    try {
       if(codeStatus === "Queued"){
            var jobs = schedule.scheduledJobs[jobId.toString()]
            jobs.cancel()
            await ScheduleModel.updateOne({jobs: jobId.toString()}, { codeStatus: 'Canceled', status: false });

            // Send a response indicating that the job has been canceled
            res.status(200).send({
                success: true,
                message: 'Your search has been successfully scheduled.',
            });
       }
    } catch (err) {
        console.log(err)
        res.status(500).send({
            message: "We were unable to cancel your scheduled job, if this issue persists please contact us at nexusintelsupport@nexfor.co.za"
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

exports.schedulepeoplelist = async (req, res, next) => {
    const { date, parameters, uid } = req.body;
    const jobId = uuid.v4();

    // Create a new document in the ScheduleModel collection
    var newSchedule = await ScheduleModel.create({
        user: uid,
        jobs: jobId,
        date: date,
        codeStatus: 'Queued',
        status: false, // Set initial status to false (not running)
        parameters: parameters
    });

    // Save the new document to the collection
    await newSchedule.save();
    
    // Convert the input date string to a Date object
    const scheduledDate = new Date(date);

    // Update the status to indicate that the job is running
    await ScheduleModel.findByIdAndUpdate(newSchedule._id, { status: true });

    // Schedule the job to run at the specified date and time
    const job = schedule.scheduleJob(jobId, scheduledDate, async function () {
        // Get the parameters from the stored schedule document
        const storedSchedule = await ScheduleModel.findById(newSchedule._id);
        const parameters = storedSchedule.parameters;

        // Extract the auth token from the request object.
        const token = req.authToken;

        const uid = parameters.uid; // Define and initialize uid variable
        const name = parameters.name; // Define and initialize name variable
        const header = parameters.header; // Define and initialize header variable
        const share = parameters.share; // Define and initialize share variable
        const surname = parameters.surname; // Define and initialize surname variable
        const restrictCost = parameters.restrictCost; // Define and initialize restrictCost variable
        const currentTotal = parameters.currentTotal; // Define and initialize currentTotal variable
        const project = parameters.project; // Define and initialize PermissiblePurpose variable
        const title = parameters.restrictionName; // Define and initialize PermissiblePurpose variable
        const PermissiblePurpose = parameters.permissiblePurpose; // Define and initialize PermissiblePurpose
        const pid = parameters.pid // Define and initialize pid
        const license = parameters.license; // Define and initialize license
        const userEmail = parameters.userEmail; // Define and initialize userEmail

        const info = {
            Token: token,
            PermissiblePurpose: parameters.PermissiblePurpose,
            IDNumber: parameters.IDNumber,
            Surname: parameters.Surname,
            FirstName: parameters.FirstName,
            SecondName: parameters.SecondName,
            DOB: parameters.DOB,
            UsePP: parameters.UsePP,
            UseDHAExtra: '',
            Reference: parameters.Reference,
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
              } 
        } catch (err) {
            console.log(err)
        }

        // Update the status to indicate that the job is completed
        await ScheduleModel.findByIdAndUpdate(newSchedule._id, { codeStatus: 'Completed', status: false });
    });

    const jobID = schedule.scheduledJobs[jobId];
    console.log(jobID)

    // Send a response indicating that the job has been scheduled
    res.status(200).send({
        success: true,
        message: 'Your search has been successfully scheduled.',
    });
};


/**
 * Controller function to search for a list of people using a third-party API.
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} next - Express next function
 * @returns {Promise<void>}
 */

exports.scheduleeagleeyelist = async (req, res, next) => {
    const { date, parameters, uid } = req.body;
    const jobId = uuid.v4();

    // Create a new document in the ScheduleModel collection
    var newSchedule = await ScheduleModel.create({
        user: uid,
        jobs: jobId,
        date: date,
        codeStatus: 'Queued',
        status: false, // Set initial status to false (not running)
        parameters: parameters
    });

    // Save the new document to the collection
    await newSchedule.save();
    
    // Convert the input date string to a Date object
    const scheduledDate = new Date(date);

    // Update the status to indicate that the job is running
    await ScheduleModel.findByIdAndUpdate(newSchedule._id, { status: true });

    // Schedule the job to run at the specified date and time
    const job = schedule.scheduleJob(jobId, scheduledDate, async function () {
        // Get the parameters from the stored schedule document
        const storedSchedule = await ScheduleModel.findById(newSchedule._id);
        const parameters = storedSchedule.parameters;

        // Extract the auth token from the request object.
        const token = req.authToken;

        const uid = parameters.uid; // Define and initialize uid variable
        const name = parameters.name; // Define and initialize name variable
        const header = parameters.header; // Define and initialize header variable
        const share = parameters.share; // Define and initialize share variable
        const surname = parameters.surname; // Define and initialize surname variable
        const restrictCost = parameters.restrictCost; // Define and initialize restrictCost variable
        const currentTotal = parameters.currentTotal; // Define and initialize currentTotal variable
        const project = parameters.project; // Define and initialize PermissiblePurpose variable
        const title = parameters.restrictionName; // Define and initialize PermissiblePurpose variable
        const PermissiblePurpose = parameters.permissiblePurpose; // Define and initialize PermissiblePurpose
        const pid = parameters.pid // Define and initialize pid
        const license = parameters.license; // Define and initialize license
        const userEmail = parameters.userEmail; // Define and initialize userEmail
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
              } 
        } catch (err) {
            console.log(err)
        }

        // Update the status to indicate that the job is completed
        await ScheduleModel.findByIdAndUpdate(newSchedule._id, { codeStatus: 'Completed', status: false });
    });

    const jobID = schedule.scheduledJobs[jobId];
    console.log(jobID)

    // Send a response indicating that the job has been scheduled
    res.status(200).send({
        success: true,
        message: 'Your search has been successfully scheduled.',
    });
};


/**
 * Controller function to search for a list of people using a third-party API.
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} next - Express next function
 * @returns {Promise<void>}
 */

exports.scheduleproofofaddress = async (req, res, next) => {
    const { date, parameters, uid } = req.body;
    const jobId = uuid.v4();

    // Create a new document in the ScheduleModel collection
    var newSchedule = await ScheduleModel.create({
        user: uid,
        jobs: jobId,
        date: date,
        codeStatus: 'Queued',
        status: false, // Set initial status to false (not running)
        parameters: parameters
    });

    // Save the new document to the collection
    await newSchedule.save();
    
    // Convert the input date string to a Date object
    const scheduledDate = new Date(date);

    // Update the status to indicate that the job is running
    await ScheduleModel.findByIdAndUpdate(newSchedule._id, { status: true });

    // Schedule the job to run at the specified date and time
    const job = schedule.scheduleJob(jobId, scheduledDate, async function () {
        // Get the parameters from the stored schedule document
        const storedSchedule = await ScheduleModel.findById(newSchedule._id);
        const parameters = storedSchedule.parameters;

        // Extract the auth token from the request object.
        const token = req.authToken;

        const uid = parameters.uid; // Define and initialize uid variable
        const name = parameters.name; // Define and initialize name variable
        const header = parameters.header; // Define and initialize header variable
        const share = parameters.share; // Define and initialize share variable
        const surname = parameters.surname; // Define and initialize surname variable
        const restrictCost = parameters.restrictCost; // Define and initialize restrictCost variable
        const currentTotal = parameters.currentTotal; // Define and initialize currentTotal variable
        const project = parameters.project; // Define and initialize PermissiblePurpose variable
        const title = parameters.restrictionName; // Define and initialize PermissiblePurpose variable
        const PermissiblePurpose = parameters.permissiblePurpose; // Define and initialize PermissiblePurpose
        const pid = parameters.pid // Define and initialize pid
        const license = parameters.license; // Define and initialize license
        const userEmail = parameters.userEmail; // Define and initialize userEmail
        const Reference = req.body.Reference;
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
              } 
        } catch (err) {
            console.log(err)
        }

        // Update the status to indicate that the job is completed
        await ScheduleModel.findByIdAndUpdate(newSchedule._id, { codeStatus: 'Completed', status: false });
    });

    const jobID = schedule.scheduledJobs[jobId];
    console.log(jobID)

    // Send a response indicating that the job has been scheduled
    res.status(200).send({
        success: true,
        message: 'Your search has been successfully scheduled.',
    });
};


/**
 * Controller function to search for a list of people using a third-party API.
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} next - Express next function
 * @returns {Promise<void>}
 */

exports.schedulelifestyleauditreport = async (req, res, next) => {
    const { date, parameters, uid } = req.body;
    const jobId = uuid.v4();

    // Create a new document in the ScheduleModel collection
    var newSchedule = await ScheduleModel.create({
        user: uid,
        jobs: jobId,
        date: date,
        codeStatus: 'Queued',
        status: false, // Set initial status to false (not running)
        parameters: parameters
    });

    // Save the new document to the collection
    await newSchedule.save();
    
    // Convert the input date string to a Date object
    const scheduledDate = new Date(date);

    // Update the status to indicate that the job is running
    await ScheduleModel.findByIdAndUpdate(newSchedule._id, { status: true });

    // Schedule the job to run at the specified date and time
    const job = schedule.scheduleJob(jobId, scheduledDate, async function () {
        // Get the parameters from the stored schedule document
        const storedSchedule = await ScheduleModel.findById(newSchedule._id);
        const parameters = storedSchedule.parameters;

        // Extract the auth token from the request object.
        const token = req.authToken;

        const uid = req.body.uid; // Define and initialize uid variable
        const name = parameters.name; // Define and initialize name variable
        const header = parameters.header; // Define and initialize header variable
        const share = parameters.share; // Define and initialize share variable
        const surname = parameters.surname; // Define and initialize surname variable
        const restrictCost = parameters.restrictCost; // Define and initialize restrictCost variable
        const currentTotal = parameters.currentTotal; // Define and initialize currentTotal variable
        const project = parameters.project; // Define and initialize PermissiblePurpose variable
        const title = parameters.restrictionName; // Define and initialize PermissiblePurpose variable
        const PermissiblePurpose = parameters.PermissiblePurpose; // Define and initialize PermissiblePurpose
        const pid = parameters.pid // Define and initialize pid
        const license = parameters.license; // Define and initialize license
        const userEmail = parameters.userEmail; // Define and initialize userEmail
        const Reference = parameters.Reference; // Define and initialize userEmail
        const EnquiryDoneBy = parameters.EnquiryDoneBy; // Define and initialize userEmail
        const EnquiryReason = parameters.EnquiryReason; // Define and initialize userEmail
        const InputPerson = parameters.InputPerson; // Define and initialize userEmail
        const InputAddress = parameters.InputAddress; // Define and initialize userEmail
        const IDNumber = parameters.IDNumber; // Define and initialize userEmail

        const info = {
            Token:token,
            PermissiblePurpose: PermissiblePurpose,
            IDNumber: IDNumber,
            Reference: Reference,
            EnquiryReason: EnquiryReason,
            EnquiryDoneBy: EnquiryDoneBy,
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
                //updateProjectModelSearch(restrictCost, uid, name, surname, header, pid, project, title, PermissiblePurpose, share, currentTotal)
                updateLicenseModelSearch(license, title, restrictCost)
                
                      
                await axios.post('http://localhost:2000/api/v1/exchange/send',{
                    email: userEmail,
                    from: `${name} ${surname}`,
                    subject: 'Lifestyle Audit Report',
                    message: 'Congratulations! Your scheduled Lifestyle Audit Report search was a success. We invite you to check out the Nexus Intelligence dashboard where you can view your search and explore other features at your Incoming Searches. Thank you for trusting us to provide you with the information you need to make informed decisions.'
                },config);
              } 
        } catch (err) {
            console.log(err)
        }

        // Update the status to indicate that the job is completed
        await ScheduleModel.findByIdAndUpdate(newSchedule._id, { codeStatus: 'Completed', status: false });
    });

    const jobID = schedule.scheduledJobs[jobId];
    console.log(jobID)

    // Send a response indicating that the job has been scheduled
    res.status(200).send({
        success: true,
        message: 'Your search has been successfully scheduled.',
    });
};


/**
 * Controller function to search for a list of people using a third-party API.
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} next - Express next function
 * @returns {Promise<void>}
 */

exports.scheduleidentityverification = async (req, res, next) => {
    const { date, parameters, uid } = req.body;
    const jobId = uuid.v4();

    // Create a new document in the ScheduleModel collection
    var newSchedule = await ScheduleModel.create({
        user: uid,
        jobs: jobId,
        date: date,
        codeStatus: 'Queued',
        status: false, // Set initial status to false (not running)
        parameters: parameters
    });

    // Save the new document to the collection
    await newSchedule.save();
    
    // Convert the input date string to a Date object
    const scheduledDate = new Date(date);

    // Update the status to indicate that the job is running
    await ScheduleModel.findByIdAndUpdate(newSchedule._id, { status: true });

    // Schedule the job to run at the specified date and time
    const job = schedule.scheduleJob(jobId, scheduledDate, async function () {
        // Get the parameters from the stored schedule document
        const storedSchedule = await ScheduleModel.findById(newSchedule._id);
        const parameters = storedSchedule.parameters;

        // Extract the auth token from the request object.
        const token = req.authToken;

        const uid = parameters.uid; // Define and initialize uid variable
        const name = parameters.name; // Define and initialize name variable
        const header = parameters.header; // Define and initialize header variable
        const share = parameters.share; // Define and initialize share variable
        const surname = parameters.surname; // Define and initialize surname variable
        const restrictCost = parameters.restrictCost; // Define and initialize restrictCost variable
        const currentTotal = parameters.currentTotal; // Define and initialize currentTotal variable
        const project = parameters.project; // Define and initialize PermissiblePurpose variable
        const title = parameters.restrictionName; // Define and initialize PermissiblePurpose variable
        const PermissiblePurpose = parameters.permissiblePurpose; // Define and initialize PermissiblePurpose
        const pid = parameters.pid // Define and initialize pid
        const license = parameters.license; // Define and initialize license
        const userEmail = parameters.userEmail; // Define and initialize userEmail
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
              } 
        } catch (err) {
            console.log(err)
        }

        // Update the status to indicate that the job is completed
        await ScheduleModel.findByIdAndUpdate(newSchedule._id, { codeStatus: 'Completed', status: false });
    });

    const jobID = schedule.scheduledJobs[jobId];
    console.log(jobID)

    // Send a response indicating that the job has been scheduled
    res.status(200).send({
        success: true,
        message: 'Your search has been successfully scheduled.',
    });
};

/**
 * Controller function to search for a list of people using a third-party API.
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} next - Express next function
 * @returns {Promise<void>}
 */

exports.schedulerelativelinks = async (req, res, next) => {
    const { date, parameters, uid } = req.body;
    const jobId = uuid.v4();

    // Create a new document in the ScheduleModel collection
    var newSchedule = await ScheduleModel.create({
        user: uid,
        jobs: jobId,
        date: date,
        codeStatus: 'Queued',
        status: false, // Set initial status to false (not running)
        parameters: parameters
    });

    // Save the new document to the collection
    await newSchedule.save();
    
    // Convert the input date string to a Date object
    const scheduledDate = new Date(date);

    // Update the status to indicate that the job is running
    await ScheduleModel.findByIdAndUpdate(newSchedule._id, { status: true });

    // Schedule the job to run at the specified date and time
    const job = schedule.scheduleJob(jobId, scheduledDate, async function () {
        // Get the parameters from the stored schedule document
        const storedSchedule = await ScheduleModel.findById(newSchedule._id);
        const parameters = storedSchedule.parameters;

        // Extract the auth token from the request object.
        const token = req.authToken;

        const uid = parameters.uid; // Define and initialize uid variable
        const name = parameters.name; // Define and initialize name variable
        const header = parameters.header; // Define and initialize header variable
        const share = parameters.share; // Define and initialize share variable
        const surname = parameters.surname; // Define and initialize surname variable
        const restrictCost = parameters.restrictCost; // Define and initialize restrictCost variable
        const currentTotal = parameters.currentTotal; // Define and initialize currentTotal variable
        const project = parameters.project; // Define and initialize PermissiblePurpose variable
        const title = parameters.restrictionName; // Define and initialize PermissiblePurpose variable
        const PermissiblePurpose = parameters.permissiblePurpose; // Define and initialize PermissiblePurpose
        const pid = parameters.pid // Define and initialize pid
        const license = parameters.license; // Define and initialize license
        const userEmail = parameters.userEmail; // Define and initialize userEmail
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
              } 
        } catch (err) {
            console.log(err)
        }

        // Update the status to indicate that the job is completed
        await ScheduleModel.findByIdAndUpdate(newSchedule._id, { codeStatus: 'Completed', status: false });
    });

    const jobID = schedule.scheduledJobs[jobId];
    console.log(jobID)

    // Send a response indicating that the job has been scheduled
    res.status(200).send({
        success: true,
        message: 'Your search has been successfully scheduled.',
    });
};


/**
 * Controller function to search for a list of people using a third-party API.
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} next - Express next function
 * @returns {Promise<void>}
 */

exports.scheduleaddresslist = async (req, res, next) => {
    const { date, parameters, uid } = req.body;
    const jobId = uuid.v4();

    // Create a new document in the ScheduleModel collection
    var newSchedule = await ScheduleModel.create({
        user: uid,
        jobs: jobId,
        date: date,
        codeStatus: 'Queued',
        status: false, // Set initial status to false (not running)
        parameters: parameters
    });

    // Save the new document to the collection
    await newSchedule.save();
    
    // Convert the input date string to a Date object
    const scheduledDate = new Date(date);

    // Update the status to indicate that the job is running
    await ScheduleModel.findByIdAndUpdate(newSchedule._id, { status: true });

    // Schedule the job to run at the specified date and time
    const job = schedule.scheduleJob(jobId, scheduledDate, async function () {
        // Get the parameters from the stored schedule document
        const storedSchedule = await ScheduleModel.findById(newSchedule._id);
        const parameters = storedSchedule.parameters;

        // Extract the auth token from the request object.
        const token = req.authToken;

        const uid = parameters.uid; // Define and initialize uid variable
        const name = parameters.name; // Define and initialize name variable
        const header = parameters.header; // Define and initialize header variable
        const share = parameters.share; // Define and initialize share variable
        const surname = parameters.surname; // Define and initialize surname variable
        const restrictCost = parameters.restrictCost; // Define and initialize restrictCost variable
        const currentTotal = parameters.currentTotal; // Define and initialize currentTotal variable
        const project = parameters.project; // Define and initialize PermissiblePurpose variable
        const title = parameters.restrictionName; // Define and initialize PermissiblePurpose variable
        const PermissiblePurpose = parameters.permissiblePurpose; // Define and initialize PermissiblePurpose
        const pid = parameters.pid // Define and initialize pid
        const license = parameters.license; // Define and initialize license
        const userEmail = parameters.userEmail; // Define and initialize userEmail
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
              } 
        } catch (err) {
            console.log(err)
        }

        // Update the status to indicate that the job is completed
        await ScheduleModel.findByIdAndUpdate(newSchedule._id, { codeStatus: 'Completed', status: false });
    });

    const jobID = schedule.scheduledJobs[jobId];
    console.log(jobID)

    // Send a response indicating that the job has been scheduled
    res.status(200).send({
        success: true,
        message: 'Your search has been successfully scheduled.',
    });
};

/**
 * Controller function to search for a list of people using a third-party API.
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} next - Express next function
 * @returns {Promise<void>}
 */

exports.scheduletelephonelist = async (req, res, next) => {
    const { date, parameters, uid } = req.body;
    const jobId = uuid.v4();

    // Create a new document in the ScheduleModel collection
    var newSchedule = await ScheduleModel.create({
        user: uid,
        jobs: jobId,
        date: date,
        codeStatus: 'Queued',
        status: false, // Set initial status to false (not running)
        parameters: parameters
    });

    // Save the new document to the collection
    await newSchedule.save();
    
    // Convert the input date string to a Date object
    const scheduledDate = new Date(date);

    // Update the status to indicate that the job is running
    await ScheduleModel.findByIdAndUpdate(newSchedule._id, { status: true });

    // Schedule the job to run at the specified date and time
    const job = schedule.scheduleJob(jobId, scheduledDate, async function () {
        // Get the parameters from the stored schedule document
        const storedSchedule = await ScheduleModel.findById(newSchedule._id);
        const parameters = storedSchedule.parameters;

        // Extract the auth token from the request object.
        const token = req.authToken;

        const uid = parameters.uid; // Define and initialize uid variable
        const name = parameters.name; // Define and initialize name variable
        const header = parameters.header; // Define and initialize header variable
        const share = parameters.share; // Define and initialize share variable
        const surname = parameters.surname; // Define and initialize surname variable
        const restrictCost = parameters.restrictCost; // Define and initialize restrictCost variable
        const currentTotal = parameters.currentTotal; // Define and initialize currentTotal variable
        const project = parameters.project; // Define and initialize PermissiblePurpose variable
        const title = parameters.restrictionName; // Define and initialize PermissiblePurpose variable
        const PermissiblePurpose = parameters.permissiblePurpose; // Define and initialize PermissiblePurpose
        const pid = parameters.pid // Define and initialize pid
        const license = parameters.license; // Define and initialize license
        const userEmail = parameters.userEmail; // Define and initialize userEmail
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
              } 
        } catch (err) {
            console.log(err)
        }

        // Update the status to indicate that the job is completed
        await ScheduleModel.findByIdAndUpdate(newSchedule._id, { codeStatus: 'Completed', status: false });
    });

    const jobID = schedule.scheduledJobs[jobId];
    console.log(jobID)

    // Send a response indicating that the job has been scheduled
    res.status(200).send({
        success: true,
        message: 'Your search has been successfully scheduled.',
    });
};


/**
 * Controller function to search for a list of people using a third-party API.
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} next - Express next function
 * @returns {Promise<void>}
 */

exports.scheduleemailaddresslist = async (req, res, next) => {
    const { date, parameters, uid } = req.body;
    const jobId = uuid.v4();

    // Create a new document in the ScheduleModel collection
    var newSchedule = await ScheduleModel.create({
        user: uid,
        jobs: jobId,
        date: date,
        codeStatus: 'Queued',
        status: false, // Set initial status to false (not running)
        parameters: parameters
    });

    // Save the new document to the collection
    await newSchedule.save();
    
    // Convert the input date string to a Date object
    const scheduledDate = new Date(date);

    // Update the status to indicate that the job is running
    await ScheduleModel.findByIdAndUpdate(newSchedule._id, { status: true });

    // Schedule the job to run at the specified date and time
    const job = schedule.scheduleJob(jobId, scheduledDate, async function () {
        // Get the parameters from the stored schedule document
        const storedSchedule = await ScheduleModel.findById(newSchedule._id);
        const parameters = storedSchedule.parameters;

        // Extract the auth token from the request object.
        const token = req.authToken;

        const uid = parameters.uid; // Define and initialize uid variable
        const name = parameters.name; // Define and initialize name variable
        const header = parameters.header; // Define and initialize header variable
        const share = parameters.share; // Define and initialize share variable
        const surname = parameters.surname; // Define and initialize surname variable
        const restrictCost = parameters.restrictCost; // Define and initialize restrictCost variable
        const currentTotal = parameters.currentTotal; // Define and initialize currentTotal variable
        const project = parameters.project; // Define and initialize PermissiblePurpose variable
        const title = parameters.restrictionName; // Define and initialize PermissiblePurpose variable
        const PermissiblePurpose = parameters.permissiblePurpose; // Define and initialize PermissiblePurpose
        const pid = parameters.pid // Define and initialize pid
        const license = parameters.license; // Define and initialize license
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
              } 
        } catch (err) {
            console.log(err)
        }

        // Update the status to indicate that the job is completed
        await ScheduleModel.findByIdAndUpdate(newSchedule._id, { codeStatus: 'Completed', status: false });
    });

    const jobID = schedule.scheduledJobs[jobId];
    console.log(jobID)

    // Send a response indicating that the job has been scheduled
    res.status(200).send({
        success: true,
        message: 'Your search has been successfully scheduled.',
    });
};


/**
 * Controller function to search for a list of people using a third-party API.
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} next - Express next function
 * @returns {Promise<void>}
 */

exports.schedulecipcdirectorslist = async (req, res, next) => {
    const { date, parameters, uid } = req.body;
    const jobId = uuid.v4();

    // Create a new document in the ScheduleModel collection
    var newSchedule = await ScheduleModel.create({
        user: uid,
        jobs: jobId,
        date: date,
        codeStatus: 'Queued',
        status: false, // Set initial status to false (not running)
        parameters: parameters
    });

    // Save the new document to the collection
    await newSchedule.save();
    
    // Convert the input date string to a Date object
    const scheduledDate = new Date(date);

    // Update the status to indicate that the job is running
    await ScheduleModel.findByIdAndUpdate(newSchedule._id, { status: true });

    // Schedule the job to run at the specified date and time
    const job = schedule.scheduleJob(jobId, scheduledDate, async function () {
        // Get the parameters from the stored schedule document
        const storedSchedule = await ScheduleModel.findById(newSchedule._id);
        const parameters = storedSchedule.parameters;

        // Extract the auth token from the request object.
        const token = req.authToken;

        const uid = req.body.uid; // Define and initialize uid variable
        const name = parameters.name; // Define and initialize name variable
        const header = parameters.header; // Define and initialize header variable
        const share = parameters.share; // Define and initialize share variable
        const surname = parameters.surname; // Define and initialize surname variable
        const restrictCost = parameters.restrictCost; // Define and initialize restrictCost variable
        const currentTotal = parameters.currentTotal; // Define and initialize currentTotal variable
        const project = parameters.project; // Define and initialize PermissiblePurpose variable
        const title = parameters.restrictionName; // Define and initialize PermissiblePurpose variable
        const PermissiblePurpose = parameters.PermissiblePurpose; // Define and initialize PermissiblePurpose
        const pid = parameters.pid // Define and initialize pid
        const license = parameters.license; // Define and initialize license
        const RegistrationNumber = parameters.RegistrationNumber; // Define and initialize userEmail
        const Reference = parameters.Reference; // Define and initialize userEmail
        const IDNumber = parameters.IDNumber; // Define and initialize userEmail

        
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
                //updateProjectModelSearch(restrictCost, uid, name, surname, header, pid, project, title, PermissiblePurpose, share, currentTotal)
                updateLicenseModelSearch(license, title, restrictCost)
                
                      
                await axios.post('http://localhost:2000/api/v1/exchange/send',{
                    email: userEmail,
                    from: `${name} ${surname}`,
                    subject: 'CIPC Director Listing',
                    message: 'Congratulations! Your scheduled CIPC Director Listing search was a success. We invite you to check out the Nexus Intelligence dashboard where you can view your search and explore other features at your Incoming Searches. Thank you for trusting us to provide you with the information you need to make informed decisions.'
                },config);
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

        // Update the status to indicate that the job is completed
        await ScheduleModel.findByIdAndUpdate(newSchedule._id, { codeStatus: 'Completed', status: false });
    });

    const jobID = schedule.scheduledJobs[jobId];
    console.log(jobID)

    // Send a response indicating that the job has been scheduled
    res.status(200).send({
        success: true,
        message: 'Your search has been successfully scheduled.',
    });
};

/**
 * Controller function to search for a list of people using a third-party API.
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} next - Express next function
 * @returns {Promise<void>}
 */

exports.schedulecipcauditorslist = async (req, res, next) => {
    const { date, parameters, uid } = req.body;
    const jobId = uuid.v4();

    // Create a new document in the ScheduleModel collection
    var newSchedule = await ScheduleModel.create({
        user: uid,
        jobs: jobId,
        date: date,
        codeStatus: 'Queued',
        status: false, // Set initial status to false (not running)
        parameters: parameters
    });

    // Save the new document to the collection
    await newSchedule.save();
    
    // Convert the input date string to a Date object
    const scheduledDate = new Date(date);

    // Update the status to indicate that the job is running
    await ScheduleModel.findByIdAndUpdate(newSchedule._id, { status: true });

    // Schedule the job to run at the specified date and time
    const job = schedule.scheduleJob(jobId, scheduledDate, async function () {
        // Get the parameters from the stored schedule document
        const storedSchedule = await ScheduleModel.findById(newSchedule._id);
        const parameters = storedSchedule.parameters;

        // Extract the auth token from the request object.
        const token = req.authToken;

        const uid = parameters.uid; // Define and initialize uid variable
        const name = parameters.name; // Define and initialize name variable
        const header = parameters.header; // Define and initialize header variable
        const share = parameters.share; // Define and initialize share variable
        const surname = parameters.surname; // Define and initialize surname variable
        const restrictCost = parameters.restrictCost; // Define and initialize restrictCost variable
        const currentTotal = parameters.currentTotal; // Define and initialize currentTotal variable
        const project = parameters.project; // Define and initialize PermissiblePurpose variable
        const title = parameters.restrictionName; // Define and initialize PermissiblePurpose variable
        const PermissiblePurpose = parameters.PermissiblePurpose; // Define and initialize PermissiblePurpose
        const pid = parameters.pid // Define and initialize pid
        const license = parameters.license; // Define and initialize license
        const RegistrationNumber = parameters.RegistrationNumber; // Define and initialize userEmail
        const Reference = parameters.Reference; // Define and initialize userEmail

        
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
              } 
        } catch (err) {
            console.log(err)
        }

        // Update the status to indicate that the job is completed
        await ScheduleModel.findByIdAndUpdate(newSchedule._id, { codeStatus: 'Completed', status: false });
    });

    const jobID = schedule.scheduledJobs[jobId];
    console.log(jobID)

    // Send a response indicating that the job has been scheduled
    res.status(200).send({
        success: true,
        message: 'Your search has been successfully scheduled.',
    });
};

/**
 * Controller function to search for a list of people using a third-party API.
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} next - Express next function
 * @returns {Promise<void>}
 */

exports.schedulespouse = async (req, res, next) => {
    const { date, parameters, uid } = req.body;
    const jobId = uuid.v4();

    // Create a new document in the ScheduleModel collection
    var newSchedule = await ScheduleModel.create({
        user: uid,
        jobs: jobId,
        date: date,
        codeStatus: 'Queued',
        status: false, // Set initial status to false (not running)
        parameters: parameters
    });

    // Save the new document to the collection
    await newSchedule.save();
    
    // Convert the input date string to a Date object
    const scheduledDate = new Date(date);

    // Update the status to indicate that the job is running
    await ScheduleModel.findByIdAndUpdate(newSchedule._id, { status: true });

    // Schedule the job to run at the specified date and time
    const job = schedule.scheduleJob(jobId, scheduledDate, async function () {
        // Get the parameters from the stored schedule document
        const storedSchedule = await ScheduleModel.findById(newSchedule._id);
        const parameters = storedSchedule.parameters;

        // Extract the auth token from the request object.
        const token = req.authToken;

        const uid = parameters.uid; // Define and initialize uid variable
        const name = parameters.name; // Define and initialize name variable
        const header = parameters.header; // Define and initialize header variable
        const share = parameters.share; // Define and initialize share variable
        const surname = parameters.surname; // Define and initialize surname variable
        const restrictCost = parameters.restrictCost; // Define and initialize restrictCost variable
        const currentTotal = parameters.currentTotal; // Define and initialize currentTotal variable
        const project = parameters.project; // Define and initialize PermissiblePurpose variable
        const title = parameters.restrictionName; // Define and initialize PermissiblePurpose variable
        const PermissiblePurpose = parameters.permissiblePurpose; // Define and initialize PermissiblePurpose
        const pid = parameters.pid // Define and initialize pid
        const license = parameters.license; // Define and initialize license
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
              } 
        } catch (err) {
            console.log(err)
        }

        // Update the status to indicate that the job is completed
        await ScheduleModel.findByIdAndUpdate(newSchedule._id, { codeStatus: 'Completed', status: false });
    });

    const jobID = schedule.scheduledJobs[jobId];
    console.log(jobID)

    // Send a response indicating that the job has been scheduled
    res.status(200).send({
        success: true,
        message: 'Your search has been successfully scheduled.',
    });
};


/**
 * Controller function to search for a list of people using a third-party API.
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} next - Express next function
 * @returns {Promise<void>}
 */

exports.schedulecipcenterpriseslist= async (req, res, next) => {
    const { date, parameters, uid } = req.body;
    const jobId = uuid.v4();

    // Create a new document in the ScheduleModel collection
    var newSchedule = await ScheduleModel.create({
        user: uid,
        jobs: jobId,
        date: date,
        codeStatus: 'Queued',
        status: false, // Set initial status to false (not running)
        parameters: parameters
    });

    // Save the new document to the collection
    await newSchedule.save();
    
    // Convert the input date string to a Date object
    const scheduledDate = new Date(date);

    // Update the status to indicate that the job is running
    await ScheduleModel.findByIdAndUpdate(newSchedule._id, { status: true });

    // Schedule the job to run at the specified date and time
    const job = schedule.scheduleJob(jobId, scheduledDate, async function () {
        // Get the parameters from the stored schedule document
        const storedSchedule = await ScheduleModel.findById(newSchedule._id);
        const parameters = storedSchedule.parameters;

        // Extract the auth token from the request object.
        const token = req.authToken;

        const uid = parameters.uid; // Define and initialize uid variable
        const name = parameters.name; // Define and initialize name variable
        const header = parameters.header; // Define and initialize header variable
        const share = parameters.share; // Define and initialize share variable
        const surname = parameters.surname; // Define and initialize surname variable
        const restrictCost = parameters.restrictCost; // Define and initialize restrictCost variable
        const currentTotal = parameters.currentTotal; // Define and initialize currentTotal variable
        const project = parameters.project; // Define and initialize PermissiblePurpose variable
        const title = parameters.restrictionName; // Define and initialize PermissiblePurpose variable
        const PermissiblePurpose = parameters.permissiblePurpose; // Define and initialize PermissiblePurpose
        const pid = parameters.pid // Define and initialize pid
        const license = parameters.license; // Define and initialize license
        const RegistrationNumber = req.body.RegistrationNumber; // Define and initialize userEmaill
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
              } 
        } catch (err) {
            console.log(err)
        }

        // Update the status to indicate that the job is completed
        await ScheduleModel.findByIdAndUpdate(newSchedule._id, { codeStatus: 'Completed', status: false });
    });

    const jobID = schedule.scheduledJobs[jobId];
    console.log(jobID)

    // Send a response indicating that the job has been scheduled
    res.status(200).send({
        success: true,
        message: 'Your search has been successfully scheduled.',
    });
};


/**
 * Controller function to search for a list of people using a third-party API.
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} next - Express next function
 * @returns {Promise<void>}
 */

exports.schedulecommercialdefaultlist= async (req, res, next) => {
    const { date, parameters, uid } = req.body;
    const jobId = uuid.v4();

    // Create a new document in the ScheduleModel collection
    var newSchedule = await ScheduleModel.create({
        user: uid,
        jobs: jobId,
        date: date,
        codeStatus: 'Queued',
        status: false, // Set initial status to false (not running)
        parameters: parameters
    });

    // Save the new document to the collection
    await newSchedule.save();
    
    // Convert the input date string to a Date object
    const scheduledDate = new Date(date);

    // Update the status to indicate that the job is running
    await ScheduleModel.findByIdAndUpdate(newSchedule._id, { status: true });

    // Schedule the job to run at the specified date and time
    const job = schedule.scheduleJob(jobId, scheduledDate, async function () {
        // Get the parameters from the stored schedule document
        const storedSchedule = await ScheduleModel.findById(newSchedule._id);
        const parameters = storedSchedule.parameters;

        // Extract the auth token from the request object.
        const token = req.authToken;

        const uid = parameters.uid; // Define and initialize uid variable
        const name = parameters.name; // Define and initialize name variable
        const header = parameters.header; // Define and initialize header variable
        const share = parameters.share; // Define and initialize share variable
        const surname = parameters.surname; // Define and initialize surname variable
        const restrictCost = parameters.restrictCost; // Define and initialize restrictCost variable
        const currentTotal = parameters.currentTotal; // Define and initialize currentTotal variable
        const project = parameters.project; // Define and initialize PermissiblePurpose variable
        const title = parameters.restrictionName; // Define and initialize PermissiblePurpose variable
        const PermissiblePurpose = parameters.permissiblePurpose; // Define and initialize PermissiblePurpose
        const pid = parameters.pid // Define and initialize pid
        const license = parameters.license; // Define and initialize license
        const RegistrationNumber = req.body.RegistrationNumber; // Define and initialize userEmaill
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
              } 
        } catch (err) {
            console.log(err)
        }

        // Update the status to indicate that the job is completed
        await ScheduleModel.findByIdAndUpdate(newSchedule._id, { codeStatus: 'Completed', status: false });
    });

    const jobID = schedule.scheduledJobs[jobId];
    console.log(jobID)

    // Send a response indicating that the job has been scheduled
    res.status(200).send({
        success: true,
        message: 'Your search has been successfully scheduled.',
    });
};


/**
 * Controller function to search for a list of people using a third-party API.
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} next - Express next function
 * @returns {Promise<void>}
 */

exports.scheduledebtreviewlist= async (req, res, next) => {
    const { date, parameters, uid } = req.body;
    const jobId = uuid.v4();

    // Create a new document in the ScheduleModel collection
    var newSchedule = await ScheduleModel.create({
        user: uid,
        jobs: jobId,
        date: date,
        codeStatus: 'Queued',
        status: false, // Set initial status to false (not running)
        parameters: parameters
    });

    // Save the new document to the collection
    await newSchedule.save();
    
    // Convert the input date string to a Date object
    const scheduledDate = new Date(date);

    // Update the status to indicate that the job is running
    await ScheduleModel.findByIdAndUpdate(newSchedule._id, { status: true });

    // Schedule the job to run at the specified date and time
    const job = schedule.scheduleJob(jobId, scheduledDate, async function () {
        // Get the parameters from the stored schedule document
        const storedSchedule = await ScheduleModel.findById(newSchedule._id);
        const parameters = storedSchedule.parameters;

        // Extract the auth token from the request object.
        const token = req.authToken;

        const uid = parameters.uid; // Define and initialize uid variable
        const name = parameters.name; // Define and initialize name variable
        const header = parameters.header; // Define and initialize header variable
        const share = parameters.share; // Define and initialize share variable
        const surname = parameters.surname; // Define and initialize surname variable
        const restrictCost = parameters.restrictCost; // Define and initialize restrictCost variable
        const currentTotal = parameters.currentTotal; // Define and initialize currentTotal variable
        const project = parameters.project; // Define and initialize PermissiblePurpose variable
        const title = parameters.restrictionName; // Define and initialize PermissiblePurpose variable
        const PermissiblePurpose = parameters.permissiblePurpose; // Define and initialize PermissiblePurpose
        const pid = parameters.pid // Define and initialize pid
        const license = parameters.license; // Define and initialize license
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
              } 
        } catch (err) {
            console.log(err)
        }

        // Update the status to indicate that the job is completed
        await ScheduleModel.findByIdAndUpdate(newSchedule._id, { codeStatus: 'Completed', status: false });
    });

    const jobID = schedule.scheduledJobs[jobId];
    console.log(jobID)

    // Send a response indicating that the job has been scheduled
    res.status(200).send({
        success: true,
        message: 'Your search has been successfully scheduled.',
    });
};


/**
 * Controller function to search for a list of people using a third-party API.
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} next - Express next function
 * @returns {Promise<void>}
 */

exports.scheduledeceasedlist= async (req, res, next) => {
    const { date, parameters, uid } = req.body;
    const jobId = uuid.v4();

    // Create a new document in the ScheduleModel collection
    var newSchedule = await ScheduleModel.create({
        user: uid,
        jobs: jobId,
        date: date,
        codeStatus: 'Queued',
        status: false, // Set initial status to false (not running)
        parameters: parameters
    });

    // Save the new document to the collection
    await newSchedule.save();
    
    // Convert the input date string to a Date object
    const scheduledDate = new Date(date);

    // Update the status to indicate that the job is running
    await ScheduleModel.findByIdAndUpdate(newSchedule._id, { status: true });

    // Schedule the job to run at the specified date and time
    const job = schedule.scheduleJob(jobId, scheduledDate, async function () {
        // Get the parameters from the stored schedule document
        const storedSchedule = await ScheduleModel.findById(newSchedule._id);
        const parameters = storedSchedule.parameters;

        // Extract the auth token from the request object.
        const token = req.authToken;

        const uid = parameters.uid; // Define and initialize uid variable
        const name = parameters.name; // Define and initialize name variable
        const header = parameters.header; // Define and initialize header variable
        const share = parameters.share; // Define and initialize share variable
        const surname = parameters.surname; // Define and initialize surname variable
        const restrictCost = parameters.restrictCost; // Define and initialize restrictCost variable
        const currentTotal = parameters.currentTotal; // Define and initialize currentTotal variable
        const project = parameters.project; // Define and initialize PermissiblePurpose variable
        const title = parameters.restrictionName; // Define and initialize PermissiblePurpose variable
        const PermissiblePurpose = parameters.permissiblePurpose; // Define and initialize PermissiblePurpose
        const pid = parameters.pid // Define and initialize pid
        const license = parameters.license; // Define and initialize license
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
              } 
        } catch (err) {
            console.log(err)
        }

        // Update the status to indicate that the job is completed
        await ScheduleModel.findByIdAndUpdate(newSchedule._id, { codeStatus: 'Completed', status: false });
    });

    const jobID = schedule.scheduledJobs[jobId];
    console.log(jobID)

    // Send a response indicating that the job has been scheduled
    res.status(200).send({
        success: true,
        message: 'Your search has been successfully scheduled.',
    });
};

/**
 * Controller function to search for a list of people using a third-party API.
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} next - Express next function
 * @returns {Promise<void>}
 */

exports.scheduledeedslist= async (req, res, next) => {
    const { date, parameters, uid } = req.body;
    const jobId = uuid.v4();

    // Create a new document in the ScheduleModel collection
    var newSchedule = await ScheduleModel.create({
        user: uid,
        jobs: jobId,
        date: date,
        codeStatus: 'Queued',
        status: false, // Set initial status to false (not running)
        parameters: parameters
    });

    // Save the new document to the collection
    await newSchedule.save();
    
    // Convert the input date string to a Date object
    const scheduledDate = new Date(date);

    // Update the status to indicate that the job is running
    await ScheduleModel.findByIdAndUpdate(newSchedule._id, { status: true });

    // Schedule the job to run at the specified date and time
    const job = schedule.scheduleJob(jobId, scheduledDate, async function () {
        // Get the parameters from the stored schedule document
        const storedSchedule = await ScheduleModel.findById(newSchedule._id);
        const parameters = storedSchedule.parameters;

        // Extract the auth token from the request object.
        const token = req.authToken;

        const uid = parameters.uid; // Define and initialize uid variable
        const name = parameters.name; // Define and initialize name variable
        const header = parameters.header; // Define and initialize header variable
        const share = parameters.share; // Define and initialize share variable
        const surname = parameters.surname; // Define and initialize surname variable
        const restrictCost = parameters.restrictCost; // Define and initialize restrictCost variable
        const currentTotal = parameters.currentTotal; // Define and initialize currentTotal variable
        const project = parameters.project; // Define and initialize PermissiblePurpose variable
        const title = parameters.restrictionName; // Define and initialize PermissiblePurpose variable
        const PermissiblePurpose = parameters.permissiblePurpose; // Define and initialize PermissiblePurpose
        const pid = parameters.pid // Define and initialize pid
        const license = parameters.license; // Define and initialize license
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
              } 
        } catch (err) {
            console.log(err)
        }

        // Update the status to indicate that the job is completed
        await ScheduleModel.findByIdAndUpdate(newSchedule._id, { codeStatus: 'Completed', status: false });
    });

    const jobID = schedule.scheduledJobs[jobId];
    console.log(jobID)

    // Send a response indicating that the job has been scheduled
    res.status(200).send({
        success: true,
        message: 'Your search has been successfully scheduled.',
    });
};

/**
 * Controller function to search for a list of people using a third-party API.
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} next - Express next function
 * @returns {Promise<void>}
 */

exports.scheduledefaultlist= async (req, res, next) => {
    const { date, parameters, uid } = req.body;
    const jobId = uuid.v4();

    // Create a new document in the ScheduleModel collection
    var newSchedule = await ScheduleModel.create({
        user: uid,
        jobs: jobId,
        date: date,
        codeStatus: 'Queued',
        status: false, // Set initial status to false (not running)
        parameters: parameters
    });

    // Save the new document to the collection
    await newSchedule.save();
    
    // Convert the input date string to a Date object
    const scheduledDate = new Date(date);

    // Update the status to indicate that the job is running
    await ScheduleModel.findByIdAndUpdate(newSchedule._id, { status: true });

    // Schedule the job to run at the specified date and time
    const job = schedule.scheduleJob(jobId, scheduledDate, async function () {
        // Get the parameters from the stored schedule document
        const storedSchedule = await ScheduleModel.findById(newSchedule._id);
        const parameters = storedSchedule.parameters;

        // Extract the auth token from the request object.
        const token = req.authToken;

        const uid = parameters.uid; // Define and initialize uid variable
        const name = parameters.name; // Define and initialize name variable
        const header = parameters.header; // Define and initialize header variable
        const share = parameters.share; // Define and initialize share variable
        const surname = parameters.surname; // Define and initialize surname variable
        const restrictCost = parameters.restrictCost; // Define and initialize restrictCost variable
        const currentTotal = parameters.currentTotal; // Define and initialize currentTotal variable
        const project = parameters.project; // Define and initialize PermissiblePurpose variable
        const title = parameters.restrictionName; // Define and initialize PermissiblePurpose variable
        const PermissiblePurpose = parameters.permissiblePurpose; // Define and initialize PermissiblePurpose
        const pid = parameters.pid // Define and initialize pid
        const license = parameters.license; // Define and initialize license
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
              } 
        } catch (err) {
            console.log(err)
        }

        // Update the status to indicate that the job is completed
        await ScheduleModel.findByIdAndUpdate(newSchedule._id, { codeStatus: 'Completed', status: false });
    });

    const jobID = schedule.scheduledJobs[jobId];
    console.log(jobID)

    // Send a response indicating that the job has been scheduled
    res.status(200).send({
        success: true,
        message: 'Your search has been successfully scheduled.',
    });
};

/**
 * Controller function to search for a list of people using a third-party API.
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} next - Express next function
 * @returns {Promise<void>}
 */

exports.scheduledhalist= async (req, res, next) => {
    const { date, parameters, uid } = req.body;
    const jobId = uuid.v4();

    // Create a new document in the ScheduleModel collection
    var newSchedule = await ScheduleModel.create({
        user: uid,
        jobs: jobId,
        date: date,
        codeStatus: 'Queued',
        status: false, // Set initial status to false (not running)
        parameters: parameters
    });

    // Save the new document to the collection
    await newSchedule.save();
    
    // Convert the input date string to a Date object
    const scheduledDate = new Date(date);

    // Update the status to indicate that the job is running
    await ScheduleModel.findByIdAndUpdate(newSchedule._id, { status: true });

    // Schedule the job to run at the specified date and time
    const job = schedule.scheduleJob(jobId, scheduledDate, async function () {
        // Get the parameters from the stored schedule document
        const storedSchedule = await ScheduleModel.findById(newSchedule._id);
        const parameters = storedSchedule.parameters;

        // Extract the auth token from the request object.
        const token = req.authToken;

        const uid = parameters.uid; // Define and initialize uid variable
        const name = parameters.name; // Define and initialize name variable
        const header = parameters.header; // Define and initialize header variable
        const share = parameters.share; // Define and initialize share variable
        const surname = parameters.surname; // Define and initialize surname variable
        const restrictCost = parameters.restrictCost; // Define and initialize restrictCost variable
        const currentTotal = parameters.currentTotal; // Define and initialize currentTotal variable
        const project = parameters.project; // Define and initialize PermissiblePurpose variable
        const title = parameters.restrictionName; // Define and initialize PermissiblePurpose variable
        const PermissiblePurpose = parameters.permissiblePurpose; // Define and initialize PermissiblePurpose
        const pid = parameters.pid // Define and initialize pid
        const license = parameters.license; // Define and initialize license
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
              } 
        } catch (err) {
            console.log(err)
        }

        // Update the status to indicate that the job is completed
        await ScheduleModel.findByIdAndUpdate(newSchedule._id, { codeStatus: 'Completed', status: false });
    });

    const jobID = schedule.scheduledJobs[jobId];
    console.log(jobID)

    // Send a response indicating that the job has been scheduled
    res.status(200).send({
        success: true,
        message: 'Your search has been successfully scheduled.',
    });
};


/**
 * Controller function to search for a list of people using a third-party API.
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} next - Express next function
 * @returns {Promise<void>}
 */

exports.scheduledisputelist= async (req, res, next) => {
    const { date, parameters, uid } = req.body;
    const jobId = uuid.v4();

    // Create a new document in the ScheduleModel collection
    var newSchedule = await ScheduleModel.create({
        user: uid,
        jobs: jobId,
        date: date,
        codeStatus: 'Queued',
        status: false, // Set initial status to false (not running)
        parameters: parameters
    });

    // Save the new document to the collection
    await newSchedule.save();
    
    // Convert the input date string to a Date object
    const scheduledDate = new Date(date);

    // Update the status to indicate that the job is running
    await ScheduleModel.findByIdAndUpdate(newSchedule._id, { status: true });

    // Schedule the job to run at the specified date and time
    const job = schedule.scheduleJob(jobId, scheduledDate, async function () {
        // Get the parameters from the stored schedule document
        const storedSchedule = await ScheduleModel.findById(newSchedule._id);
        const parameters = storedSchedule.parameters;

        // Extract the auth token from the request object.
        const token = req.authToken;

        const uid = parameters.uid; // Define and initialize uid variable
        const name = parameters.name; // Define and initialize name variable
        const header = parameters.header; // Define and initialize header variable
        const share = parameters.share; // Define and initialize share variable
        const surname = parameters.surname; // Define and initialize surname variable
        const restrictCost = parameters.restrictCost; // Define and initialize restrictCost variable
        const currentTotal = parameters.currentTotal; // Define and initialize currentTotal variable
        const project = parameters.project; // Define and initialize PermissiblePurpose variable
        const title = parameters.restrictionName; // Define and initialize PermissiblePurpose variable
        const PermissiblePurpose = parameters.permissiblePurpose; // Define and initialize PermissiblePurpose
        const pid = parameters.pid // Define and initialize pid
        const license = parameters.license; // Define and initialize license
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
              } 
        } catch (err) {
            console.log(err)
        }

        // Update the status to indicate that the job is completed
        await ScheduleModel.findByIdAndUpdate(newSchedule._id, { codeStatus: 'Completed', status: false });
    });

    const jobID = schedule.scheduledJobs[jobId];
    console.log(jobID)

    // Send a response indicating that the job has been scheduled
    res.status(200).send({
        success: true,
        message: 'Your search has been successfully scheduled.',
    });
};

/**
 * Controller function to search for a list of people using a third-party API.
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} next - Express next function
 * @returns {Promise<void>}
 */

exports.scheduleindividuallist= async (req, res, next) => {
    const { date, parameters, uid } = req.body;
    const jobId = uuid.v4();

    // Create a new document in the ScheduleModel collection
    var newSchedule = await ScheduleModel.create({
        user: uid,
        jobs: jobId,
        date: date,
        codeStatus: 'Queued',
        status: false, // Set initial status to false (not running)
        parameters: parameters
    });

    // Save the new document to the collection
    await newSchedule.save();
    
    // Convert the input date string to a Date object
    const scheduledDate = new Date(date);

    // Update the status to indicate that the job is running
    await ScheduleModel.findByIdAndUpdate(newSchedule._id, { status: true });

    // Schedule the job to run at the specified date and time
    const job = schedule.scheduleJob(jobId, scheduledDate, async function () {
        // Get the parameters from the stored schedule document
        const storedSchedule = await ScheduleModel.findById(newSchedule._id);
        const parameters = storedSchedule.parameters;

        // Extract the auth token from the request object.
        const token = req.authToken;

        const uid = parameters.uid; // Define and initialize uid variable
        const name = parameters.name; // Define and initialize name variable
        const header = parameters.header; // Define and initialize header variable
        const share = parameters.share; // Define and initialize share variable
        const surname = parameters.surname; // Define and initialize surname variable
        const restrictCost = parameters.restrictCost; // Define and initialize restrictCost variable
        const currentTotal = parameters.currentTotal; // Define and initialize currentTotal variable
        const project = parameters.project; // Define and initialize PermissiblePurpose variable
        const title = parameters.restrictionName; // Define and initialize PermissiblePurpose variable
        const PermissiblePurpose = parameters.permissiblePurpose; // Define and initialize PermissiblePurpose
        const pid = parameters.pid // Define and initialize pid
        const license = parameters.license; // Define and initialize license
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
              } 
        } catch (err) {
            console.log(err)
        }

        // Update the status to indicate that the job is completed
        await ScheduleModel.findByIdAndUpdate(newSchedule._id, { codeStatus: 'Completed', status: false });
    });

    const jobID = schedule.scheduledJobs[jobId];
    console.log(jobID)

    // Send a response indicating that the job has been scheduled
    res.status(200).send({
        success: true,
        message: 'Your search has been successfully scheduled.',
    });
};


/**
 * Controller function to search for a list of people using a third-party API.
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} next - Express next function
 * @returns {Promise<void>}
 */

exports.scheduleincomepredictionlist= async (req, res, next) => {
    const { date, parameters, uid } = req.body;
    const jobId = uuid.v4();

    // Create a new document in the ScheduleModel collection
    var newSchedule = await ScheduleModel.create({
        user: uid,
        jobs: jobId,
        date: date,
        codeStatus: 'Queued',
        status: false, // Set initial status to false (not running)
        parameters: parameters
    });

    // Save the new document to the collection
    await newSchedule.save();
    
    // Convert the input date string to a Date object
    const scheduledDate = new Date(date);

    // Update the status to indicate that the job is running
    await ScheduleModel.findByIdAndUpdate(newSchedule._id, { status: true });

    // Schedule the job to run at the specified date and time
    const job = schedule.scheduleJob(jobId, scheduledDate, async function () {
        // Get the parameters from the stored schedule document
        const storedSchedule = await ScheduleModel.findById(newSchedule._id);
        const parameters = storedSchedule.parameters;

        // Extract the auth token from the request object.
        const token = req.authToken;

        const uid = parameters.uid; // Define and initialize uid variable
        const name = parameters.name; // Define and initialize name variable
        const header = parameters.header; // Define and initialize header variable
        const share = parameters.share; // Define and initialize share variable
        const surname = parameters.surname; // Define and initialize surname variable
        const restrictCost = parameters.restrictCost; // Define and initialize restrictCost variable
        const currentTotal = parameters.currentTotal; // Define and initialize currentTotal variable
        const project = parameters.project; // Define and initialize PermissiblePurpose variable
        const title = parameters.restrictionName; // Define and initialize PermissiblePurpose variable
        const PermissiblePurpose = parameters.permissiblePurpose; // Define and initialize PermissiblePurpose
        const pid = parameters.pid // Define and initialize pid
        const license = parameters.license; // Define and initialize license
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
              } 
        } catch (err) {
            console.log(err)
        }

        // Update the status to indicate that the job is completed
        await ScheduleModel.findByIdAndUpdate(newSchedule._id, { codeStatus: 'Completed', status: false });
    });

    const jobID = schedule.scheduledJobs[jobId];
    console.log(jobID)

    // Send a response indicating that the job has been scheduled
    res.status(200).send({
        success: true,
        message: 'Your search has been successfully scheduled.',
    });
};


/**
 * Controller function to search for a list of people using a third-party API.
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} next - Express next function
 * @returns {Promise<void>}
 */

exports.schedulejudgementlist= async (req, res, next) => {
    const { date, parameters, uid } = req.body;
    const jobId = uuid.v4();

    // Create a new document in the ScheduleModel collection
    var newSchedule = await ScheduleModel.create({
        user: uid,
        jobs: jobId,
        date: date,
        codeStatus: 'Queued',
        status: false, // Set initial status to false (not running)
        parameters: parameters
    });

    // Save the new document to the collection
    await newSchedule.save();
    
    // Convert the input date string to a Date object
    const scheduledDate = new Date(date);

    // Update the status to indicate that the job is running
    await ScheduleModel.findByIdAndUpdate(newSchedule._id, { status: true });

    // Schedule the job to run at the specified date and time
    const job = schedule.scheduleJob(jobId, scheduledDate, async function () {
        // Get the parameters from the stored schedule document
        const storedSchedule = await ScheduleModel.findById(newSchedule._id);
        const parameters = storedSchedule.parameters;

        // Extract the auth token from the request object.
        const token = req.authToken;

        const uid = parameters.uid; // Define and initialize uid variable
        const name = parameters.name; // Define and initialize name variable
        const header = parameters.header; // Define and initialize header variable
        const share = parameters.share; // Define and initialize share variable
        const surname = parameters.surname; // Define and initialize surname variable
        const restrictCost = parameters.restrictCost; // Define and initialize restrictCost variable
        const currentTotal = parameters.currentTotal; // Define and initialize currentTotal variable
        const project = parameters.project; // Define and initialize PermissiblePurpose variable
        const title = parameters.restrictionName; // Define and initialize PermissiblePurpose variable
        const PermissiblePurpose = parameters.permissiblePurpose; // Define and initialize PermissiblePurpose
        const pid = parameters.pid // Define and initialize pid
        const license = parameters.license; // Define and initialize license
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
              } 
        } catch (err) {
            console.log(err)
        }

        // Update the status to indicate that the job is completed
        await ScheduleModel.findByIdAndUpdate(newSchedule._id, { codeStatus: 'Completed', status: false });
    });

    const jobID = schedule.scheduledJobs[jobId];
    console.log(jobID)

    // Send a response indicating that the job has been scheduled
    res.status(200).send({
        success: true,
        message: 'Your search has been successfully scheduled.',
    });
};


/**
 * Controller function to search for a list of people using a third-party API.
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} next - Express next function
 * @returns {Promise<void>}
 */

exports.schedulepaymentprofileslist= async (req, res, next) => {
    const { date, parameters, uid } = req.body;
    const jobId = uuid.v4();

    // Create a new document in the ScheduleModel collection
    var newSchedule = await ScheduleModel.create({
        user: uid,
        jobs: jobId,
        date: date,
        codeStatus: 'Queued',
        status: false, // Set initial status to false (not running)
        parameters: parameters
    });

    // Save the new document to the collection
    await newSchedule.save();
    
    // Convert the input date string to a Date object
    const scheduledDate = new Date(date);

    // Update the status to indicate that the job is running
    await ScheduleModel.findByIdAndUpdate(newSchedule._id, { status: true });

    // Schedule the job to run at the specified date and time
    const job = schedule.scheduleJob(jobId, scheduledDate, async function () {
        // Get the parameters from the stored schedule document
        const storedSchedule = await ScheduleModel.findById(newSchedule._id);
        const parameters = storedSchedule.parameters;

        // Extract the auth token from the request object.
        const token = req.authToken;

        const uid = parameters.uid; // Define and initialize uid variable
        const name = parameters.name; // Define and initialize name variable
        const header = parameters.header; // Define and initialize header variable
        const share = parameters.share; // Define and initialize share variable
        const surname = parameters.surname; // Define and initialize surname variable
        const restrictCost = parameters.restrictCost; // Define and initialize restrictCost variable
        const currentTotal = parameters.currentTotal; // Define and initialize currentTotal variable
        const project = parameters.project; // Define and initialize PermissiblePurpose variable
        const title = parameters.restrictionName; // Define and initialize PermissiblePurpose variable
        const PermissiblePurpose = parameters.permissiblePurpose; // Define and initialize PermissiblePurpose
        const pid = parameters.pid // Define and initialize pid
        const license = parameters.license; // Define and initialize license
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
              } 
        } catch (err) {
            console.log(err)
        }

        // Update the status to indicate that the job is completed
        await ScheduleModel.findByIdAndUpdate(newSchedule._id, { codeStatus: 'Completed', status: false });
    });

    const jobID = schedule.scheduledJobs[jobId];
    console.log(jobID)

    // Send a response indicating that the job has been scheduled
    res.status(200).send({
        success: true,
        message: 'Your search has been successfully scheduled.',
    });
};


/**
 * Controller function to search for a list of people using a third-party API.
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} next - Express next function
 * @returns {Promise<void>}
 */

exports.schedulepepslist= async (req, res, next) => {
    const { date, parameters, uid } = req.body;
    const jobId = uuid.v4();

    // Create a new document in the ScheduleModel collection
    var newSchedule = await ScheduleModel.create({
        user: uid,
        jobs: jobId,
        date: date,
        codeStatus: 'Queued',
        status: false, // Set initial status to false (not running)
        parameters: parameters
    });

    // Save the new document to the collection
    await newSchedule.save();
    
    // Convert the input date string to a Date object
    const scheduledDate = new Date(date);

    // Update the status to indicate that the job is running
    await ScheduleModel.findByIdAndUpdate(newSchedule._id, { status: true });

    // Schedule the job to run at the specified date and time
    const job = schedule.scheduleJob(jobId, scheduledDate, async function () {
        // Get the parameters from the stored schedule document
        const storedSchedule = await ScheduleModel.findById(newSchedule._id);
        const parameters = storedSchedule.parameters;

        // Extract the auth token from the request object.
        const token = req.authToken;

        const uid = req.body.uid; // Define and initialize uid variable
        const name = parameters.name; // Define and initialize name variable
        const userEmail = parameters.userEmail; // Define and initialize
        const header = parameters.header; // Define and initialize header variable
        const share = parameters.share; // Define and initialize share variable
        const surname = parameters.surname; // Define and initialize surname variable
        const restrictCost = parameters.restrictCost; // Define and initialize restrictCost variable
        const currentTotal = parameters.currentTotal; // Define and initialize currentTotal variable
        const project = parameters.project; // Define and initialize PermissiblePurpose variable
        const title = parameters.restrictionName; // Define and initialize PermissiblePurpose variable
        const PermissiblePurpose = parameters.PermissiblePurpose; // Define and initialize PermissiblePurpose
        const pid = parameters.pid // Define and initialize pid
        const license = parameters.license; // Define and initialize license
        const Term = parameters.Term; // Define and initialize userEmail
        const Reference = parameters.Reference; // Define and initialize userEmail
        const Refinement = parameters.Refinement; // Define and initialize userEmail
        const Scope = parameters.Scope; // Define and initialize userEmail
        const StartDate = parameters.StartDate; // Define and initialize userEmail
        const EndDate = parameters.EndDate; // Define and initialize userEmail
        const Categories = parameters.Categories; // Define and initialize userEmail
        const ThresholdScore = parameters.ThresholdScore; // Define and initialize userEmail
        const DateOfBirth = parameters.DateOfBirth; // Define and initialize userEmail
        const WatchListIDs = parameters.WatchListIDs; // Define and initialize userEmail

        
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
            WatchListIDs: WatchListIDs,
          }

        const config = {
            headers: {
              'Content-Type': 'application/json',
            },
        };

        try {
            const search = await axios.post(
              `${process.env.CPB_USER_TEST_URL}/pipspeps/list?verify=${process.env.CPB_TEST_VERIFY}`,
              info,
              config
            );

            if(pid && search.status === 200){
                // Creating the search model
                createSearchModel(pid, project, title, uid, name, header, share, surname, restrictCost, currentTotal, PermissiblePurpose, search.data)
                //updateProjectModelSearch(restrictCost, uid, name, surname, header, pid, project, title, PermissiblePurpose, share, currentTotal)
                updateLicenseModelSearch(license, title, restrictCost)
                
                      
                await axios.post('http://localhost:2000/api/v1/exchange/send',{
                    email: userEmail,
                    from: `${name} ${surname}`,
                    subject: 'PEP Listing',
                    message: 'Congratulations! Your scheduled PEP Listing search was a success. We invite you to check out the Nexus Intelligence dashboard where you can view your search and explore other features at your Incoming Searches. Thank you for trusting us to provide you with the information you need to make informed decisions.'
                },config);
              } 
        } catch (err) {
            console.log(err)
        }

        // Update the status to indicate that the job is completed
        await ScheduleModel.findByIdAndUpdate(newSchedule._id, { codeStatus: 'Completed', status: false });
    });

    const jobID = schedule.scheduledJobs[jobId];
    console.log(jobID)

    // Send a response indicating that the job has been scheduled
    res.status(200).send({
        success: true,
        message: 'Your search has been successfully scheduled.',
    });
};



/**
 * Controller function to search for a list of people using a third-party API.
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} next - Express next function
 * @returns {Promise<void>}
 */

exports.schedulebusinessinterestenquiry= async (req, res, next) => {
    const { date, parameters, uid } = req.body;
    const jobId = uuid.v4();

    // Create a new document in the ScheduleModel collection
    var newSchedule = await ScheduleModel.create({
        user: uid,
        jobs: jobId,
        date: date,
        codeStatus: 'Queued',
        status: false, // Set initial status to false (not running)
        parameters: parameters
    });

    // Save the new document to the collection
    await newSchedule.save();
    
    // Convert the input date string to a Date object
    const scheduledDate = new Date(date);

    // Update the status to indicate that the job is running
    await ScheduleModel.findByIdAndUpdate(newSchedule._id, { status: true });

    // Schedule the job to run at the specified date and time
    const job = schedule.scheduleJob(jobId, scheduledDate, async function () {
        // Get the parameters from the stored schedule document
        const storedSchedule = await ScheduleModel.findById(newSchedule._id);
        const parameters = storedSchedule.parameters;

        // Extract the auth token from the request object.
        const token = req.authToken;

        const uid = req.body.uid; // Define and initialize uid variable
        const name = parameters.name; // Define and initialize name variable
        const header = parameters.header; // Define and initialize header variable
        const share = parameters.share; // Define and initialize share variable
        const surname = parameters.surname; // Define and initialize surname variable
        const restrictCost = parameters.restrictCost; // Define and initialize restrictCost variable
        const currentTotal = parameters.currentTotal; // Define and initialize currentTotal variable
        const project = parameters.project; // Define and initialize PermissiblePurpose variable
        const title = parameters.restrictionName; // Define and initialize PermissiblePurpose variable
        const PermissiblePurpose = parameters.PermissiblePurpose; // Define and initialize PermissiblePurpose
        const pid = parameters.pid // Define and initialize pid
        const license = parameters.license; // Define and initialize license
        const IDNumber = parameters.IDNumber; // Define and initialize userEmail
        const Reference = parameters.Reference; // Define and initialize userEmail
        const EnquiryReason = parameters.EnquiryReason; // Define and initialize userEmail
        const UseDHAExtra = parameters.UseDHAExtra; // Define and initialize userEmail
        const UseSAFPSDirect = parameters.UseSAFPSDirect; // Define and initialize userEmail
        const EnquiryDoneBy = parameters.EnquiryDoneBy; // Define and initialize userEmail
        const RawHTML = parameters.RawHTML; // Define and initialize userEmail

        
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
                //updateProjectModelSearch(restrictCost, uid, name, surname, header, pid, project, title, PermissiblePurpose, share, currentTotal)
                updateLicenseModelSearch(license, title, restrictCost)
                     
                await axios.post('http://localhost:2000/api/v1/exchange/send',{
                    email: userEmail,
                    from: `${name} ${surname}`,
                    subject: 'Business Interest Enquiry',
                    message: 'Congratulations! Your scheduled Business Interest Enquiry search was a success. We invite you to check out the Nexus Intelligence dashboard where you can view your search and explore other features at your Incoming Searches. Thank you for trusting us to provide you with the information you need to make informed decisions.'
                },config);
              } 
        } catch (err) {
            console.log(err)
        }

        // Update the status to indicate that the job is completed
        await ScheduleModel.findByIdAndUpdate(newSchedule._id, { codeStatus: 'Completed', status: false });
    });

    const jobID = schedule.scheduledJobs[jobId];
    console.log(jobID)

    // Send a response indicating that the job has been scheduled
    res.status(200).send({
        success: true,
        message: 'Your search has been successfully scheduled.',
    });
};

/**
 * Controller function to search for a list of people using a third-party API.
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} next - Express next function
 * @returns {Promise<void>}
 */

exports.schedulebankaccountverification= async (req, res, next) => {
    const { date, parameters, uid } = req.body;
    const jobId = uuid.v4();

    // Create a new document in the ScheduleModel collection
    var newSchedule = await ScheduleModel.create({
        user: uid,
        jobs: jobId,
        date: date,
        codeStatus: 'Queued',
        status: false, // Set initial status to false (not running)
        parameters: parameters
    });

    // Save the new document to the collection
    await newSchedule.save();
    
    // Convert the input date string to a Date object
    const scheduledDate = new Date(date);

    // Update the status to indicate that the job is running
    await ScheduleModel.findByIdAndUpdate(newSchedule._id, { status: true });

    // Schedule the job to run at the specified date and time
    const job = schedule.scheduleJob(jobId, scheduledDate, async function () {
        // Get the parameters from the stored schedule document
        const storedSchedule = await ScheduleModel.findById(newSchedule._id);
        const parameters = storedSchedule.parameters;

        // Extract the auth token from the request object.
        const token = req.authToken;

        const uid = req.body.uid; // Define and initialize uid variable
        const name = parameters.name; // Define and initialize name variable
        const header = parameters.header; // Define and initialize header variable
        const userEmail = parameters.userEmail; // Define and initialize header variable
        const share = parameters.share; // Define and initialize share variable
        const surname = parameters.surname; // Define and initialize surname variable
        const restrictCost = parameters.restrictCost; // Define and initialize restrictCost variable
        const currentTotal = parameters.currentTotal; // Define and initialize currentTotal variable
        const project = parameters.project; // Define and initialize PermissiblePurpose variable
        const title = parameters.restrictionName; // Define and initialize PermissiblePurpose variable
        const PermissiblePurpose = parameters.PermissiblePurpose; // Define and initialize PermissiblePurpose
        const pid = parameters.pid // Define and initialize pid
        const license = parameters.license; // Define and initialize license
        const BranchCode = parameters.BranchCode; // Define and initialize userEmail
        const Reference = parameters.Reference; // Define and initialize userEmail
        const IDNumber = parameters.IDNumber; // Define and initialize userEmail
        const AccountNumber = parameters.AccountNumber; // Define and initialize userEmail
        const AccountType = parameters.AccountType; // Define and initialize userEmail
        const IdentificationType = parameters.IdentificationType; // Define and initialize userEmail
        const Bank = parameters.Bank; // Define and initialize userEmail
        const Email = parameters.Email; // Define and initialize userEmail
        const PhoneNumber = parameters.PhoneNumber; // Define and initialize userEmail
        const Initials = parameters.Initials; // Define and initialize userEmail
        const FirstName = parameters.FirstName; // Define and initialize userEmail
        const Surname = parameters.Surname; // Define and initialize userEmail
        const HasConsent = parameters.HasConsent; // Define and initialize userEmail

        
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
                //updateProjectModelSearch(restrictCost, uid, name, surname, header, pid, project, title, PermissiblePurpose, share, currentTotal)
                updateLicenseModelSearch(license, title, restrictCost)
                
                      
                await axios.post('http://localhost:2000/api/v1/exchange/send',{
                    email: userEmail,
                    from: `${name} ${surname}`,
                    subject: 'Bank Account Verification',
                    message: 'Congratulations! Your scheduled Bank Account Verification search was a success. We invite you to check out the Nexus Intelligence dashboard where you can view your search and explore other features at your Incoming Searches. Thank you for trusting us to provide you with the information you need to make informed decisions.'
                },config);
              } 
        } catch (err) {
            console.log(err)
        }

        // Update the status to indicate that the job is completed
        await ScheduleModel.findByIdAndUpdate(newSchedule._id, { codeStatus: 'Completed', status: false });
    });

    const jobID = schedule.scheduledJobs[jobId];
    console.log(jobID)

    // Send a response indicating that the job has been scheduled
    res.status(200).send({
        success: true,
        message: 'Your search has been successfully scheduled.',
    });
};

/**
 * Controller function to search for a list of people using a third-party API.
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} next - Express next function
 * @returns {Promise<void>}
 */

exports.scheduleidvwithphotovalidation= async (req, res, next) => {
    const { date, parameters, uid } = req.body;
    const jobId = uuid.v4();

    // Create a new document in the ScheduleModel collection
    var newSchedule = await ScheduleModel.create({
        user: uid,
        jobs: jobId,
        date: date,
        codeStatus: 'Queued',
        status: false, // Set initial status to false (not running)
        parameters: parameters
    });

    // Save the new document to the collection
    await newSchedule.save();
    
    // Convert the input date string to a Date object
    const scheduledDate = new Date(date);

    // Update the status to indicate that the job is running
    await ScheduleModel.findByIdAndUpdate(newSchedule._id, { status: true });

    // Schedule the job to run at the specified date and time
    const job = schedule.scheduleJob(jobId, scheduledDate, async function () {
        // Get the parameters from the stored schedule document
        const storedSchedule = await ScheduleModel.findById(newSchedule._id);
        const parameters = storedSchedule.parameters;

        // Extract the auth token from the request object.
        const token = req.authToken;

        const uid = req.body.uid; // Define and initialize uid variable
        const name = parameters.name; // Define and initialize name variable
        const userEmail = parameters.userEmail;
        const header = parameters.header; // Define and initialize header variable
        const share = parameters.share; // Define and initialize share variable
        const surname = parameters.surname; // Define and initialize surname variable
        const restrictCost = parameters.restrictCost; // Define and initialize restrictCost variable
        const currentTotal = parameters.currentTotal; // Define and initialize currentTotal variable
        const project = parameters.project; // Define and initialize PermissiblePurpose variable
        const title = parameters.restrictionName; // Define and initialize PermissiblePurpose variable
        const PermissiblePurpose = parameters.PermissiblePurpose; // Define and initialize PermissiblePurpose
        const pid = parameters.pid // Define and initialize pid
        const license = parameters.license; // Define and initialize license
        const Reference = parameters.Reference; // Define and initialize userEmail
        const IDNumber = parameters.IDNumber; // Define and initialize userEmail

        
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
              `${process.env.CPB_USER_TEST_URL}/idv/idvalidationphoto?verify=${process.env.CPB_TEST_VERIFY}`,
              info,
              config
            );

            if(pid && search.status === 200){
                // Creating the search model
                createSearchModel(pid, project, title, uid, name, header, share, surname, restrictCost, currentTotal, PermissiblePurpose, search.data)
                //updateProjectModelSearch(restrictCost, uid, name, surname, header, pid, project, title, PermissiblePurpose, share, currentTotal)
                updateLicenseModelSearch(license, title, restrictCost)
                
                      
                await axios.post('http://localhost:2000/api/v1/exchange/send',{
                    email: userEmail,
                    from: `${name} ${surname}`,
                    subject: 'IDV Listing including photo',
                    message: 'Congratulations! Your scheduled IDV Listing including photo search was a success. We invite you to check out the Nexus Intelligence dashboard where you can view your search and explore other features at your Incoming Searches. Thank you for trusting us to provide you with the information you need to make informed decisions.'
                },config);
              } 
        } catch (err) {
            console.log(err)
        }

        // Update the status to indicate that the job is completed
        await ScheduleModel.findByIdAndUpdate(newSchedule._id, { codeStatus: 'Completed', status: false });
    });

    const jobID = schedule.scheduledJobs[jobId];
    console.log(jobID)

    // Send a response indicating that the job has been scheduled
    res.status(200).send({
        success: true,
        message: 'Your search has been successfully scheduled.',
    });
};



/**
 * Controller function to search for a list of people using a third-party API.
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} next - Express next function
 * @returns {Promise<void>}
 */

exports.scheduleidvwithoutphotovalidation= async (req, res, next) => {
    const { date, parameters, uid } = req.body;
    const jobId = uuid.v4();

    // Create a new document in the ScheduleModel collection
    var newSchedule = await ScheduleModel.create({
        user: uid,
        jobs: jobId,
        date: date,
        codeStatus: 'Queued',
        status: false, // Set initial status to false (not running)
        parameters: parameters
    });

    // Save the new document to the collection
    await newSchedule.save();
    
    // Convert the input date string to a Date object
    const scheduledDate = new Date(date);

    // Update the status to indicate that the job is running
    await ScheduleModel.findByIdAndUpdate(newSchedule._id, { status: true });

    // Schedule the job to run at the specified date and time
    const job = schedule.scheduleJob(jobId, scheduledDate, async function () {
        // Get the parameters from the stored schedule document
        const storedSchedule = await ScheduleModel.findById(newSchedule._id);
        const parameters = storedSchedule.parameters;

        // Extract the auth token from the request object.
        const token = req.authToken;

        const uid = req.body.uid; // Define and initialize uid variable
        const name = parameters.name; // Define and initialize name variable
        const userEmail = parameters.userEmail; // Define and initialize name variable
        const header = parameters.header; // Define and initialize header variable
        const share = parameters.share; // Define and initialize share variable
        const surname = parameters.surname; // Define and initialize surname variable
        const restrictCost = parameters.restrictCost; // Define and initialize restrictCost variable
        const currentTotal = parameters.currentTotal; // Define and initialize currentTotal variable
        const project = parameters.project; // Define and initialize PermissiblePurpose variable
        const title = parameters.restrictionName; // Define and initialize PermissiblePurpose variable
        const PermissiblePurpose = parameters.PermissiblePurpose; // Define and initialize PermissiblePurpose
        const pid = parameters.pid // Define and initialize pid
        const license = parameters.license; // Define and initialize license
        const RegistrationNumber = parameters.RegistrationNumber; // Define and initialize userEmail
        const Reference = parameters.Reference; // Define and initialize userEmail
        const IDNumber = parameters.IDNumber; // Define and initialize userEmail
        const MaxCacheDays = parameters.MaxCacheDays; // Define and initialize userEmail

        
        const info = {
            Token:token,
            PermissiblePurpose: PermissiblePurpose,
            IDNumber: IDNumber,
            MaxCacheDays: MaxCacheDays,
            Reference: Reference,
        }

        const config = {
            headers: {
              'Content-Type': 'application/json',
            },
        };

        try {
            const search = await axios.post(
              `${process.env.CPB_USER_TEST_URL}/idv/idvalidation?verify=${process.env.CPB_TEST_VERIFY}`,
              info,
              config
            );

            if(pid && search.status === 200){
                // Creating the search model
                createSearchModel(pid, project, title, uid, name, header, share, surname, restrictCost, currentTotal, PermissiblePurpose, search.data)
                //updateProjectModelSearch(restrictCost, uid, name, surname, header, pid, project, title, PermissiblePurpose, share, currentTotal)
                updateLicenseModelSearch(license, title, restrictCost)
                
                       
                await axios.post('http://localhost:2000/api/v1/exchange/send',{
                    email: userEmail,
                    from: `${name} ${surname}`,
                    subject: 'IDV Listing without photo',
                    message: 'Congratulations! Your scheduled IDV Listing without photo search was a success. We invite you to check out the Nexus Intelligence dashboard where you can view your search and explore other features at your Incoming Searches. Thank you for trusting us to provide you with the information you need to make informed decisions.'
                },config);
              } 
        } catch (err) {
            console.log(err)
        }

        // Update the status to indicate that the job is completed
        await ScheduleModel.findByIdAndUpdate(newSchedule._id, { codeStatus: 'Completed', status: false });
    });

    const jobID = schedule.scheduledJobs[jobId];
    console.log(jobID)

    // Send a response indicating that the job has been scheduled
    res.status(200).send({
        success: true,
        message: 'Your search has been successfully scheduled.',
    });
};




