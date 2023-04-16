const express = require('express');
const router = express.Router();

//CONTROLLERS
const {
    sendexchangeemail, sendexchangeemailsupport
} = require('../../../controllers/intgrations/exchange365/sendEmail');

//ROUTES
router.route("/send").post(sendexchangeemail);
router.route('/support/send').post(sendexchangeemailsupport);

module.exports = router;