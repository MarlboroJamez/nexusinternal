const express = require('express');
const router = express.Router();

const {
    createsupportticket 
} = require('../../controllers/support/support');

const {
    createfeedback
} = require('../../controllers/feedback/feedback');

const {
    getdashboardinformation,
    getsearchinformation,
    getlicenseforsearch
} = require('../../controllers/client/client');

//CLIENT DASHBOARD
router.route('/dashboard/data').post(getdashboardinformation);
router.route('/searches/data').post(getsearchinformation);
router.route('/searches/license').post(getlicenseforsearch);
router.route('/support/ticket').post(createsupportticket);
router.route('/feedback').post(createfeedback);

module.exports = router;