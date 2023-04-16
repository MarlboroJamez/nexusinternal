const express = require('express');
const router = express.Router();

const { authenticate } = require('../../controllers/providers/cpb/auth/auth');
const {protect} = require('../../middleware/protected/protected');

const {
    peoplelist,
    getallsearches,
    cipcauditorslist,
    cipcdirectorslist,
    cipcenterpriseslist,
    addresslist,
    lifestyleauditreport,
    pepslist,
    homeaffairsverification,
    bankaccountverification,
    businessinterestenquiry,
    idvwithphotovalidation,
    idvwithoutphotovalidation,
    companyenquiryreportcipc,
    dynamicwrapper,
    procurementenquiry,
    spiderweb,
    enterpriseriskreport,
    creditenquiry,
    idvkyc,
    traceenquiry,
    trustenquiry,
    idvenquiry,
    companykyc,
    eagleeye
} = require('../../controllers/providers/cpb/search/search');

// Regular Searches
router.route('/cpb/searches/all').post(authenticate, getallsearches)
router.route('/cpb/search/peoplelist').post(authenticate, peoplelist); 
router.route('/cpb/search/cipcauditorslist').post(authenticate, cipcauditorslist);
router.route('/cpb/search/cipcdirectorslist').post(authenticate, cipcdirectorslist);
router.route('/cpb/search/cipcenterpriseslist').post(authenticate, cipcenterpriseslist);
router.route('/cpb/search/addresslist').post(authenticate, addresslist);
router.route('/cpb/search/lifestyleauditreport').post(authenticate, lifestyleauditreport);
router.route('/cpb/search/pepslist').post(authenticate, pepslist);
router.route('/cpb/search/homeaffairsverification').post(authenticate, homeaffairsverification);
router.route('/cpb/search/idv/withphoto').post(authenticate, idvwithphotovalidation);
router.route('/cpb/search/idv/withoutphoto').post(authenticate, idvwithoutphotovalidation);
router.route('/cpb/search/bankaccountverification').post(authenticate, bankaccountverification);
router.route('/cpb/search/businessinterestinquiry').post(authenticate, businessinterestenquiry);
router.route('/cpb/search/companyenquiryreportcipc').post(authenticate, companyenquiryreportcipc)
router.route('/cpb/search/dynamicwrapper').post(authenticate, dynamicwrapper)
router.route('/cpb/search/procurementenquiry').post(authenticate, procurementenquiry)
router.route('/cpb/search/spiderweb').post(authenticate, spiderweb);
router.route('/cpb/search/enterpriseriskreport').post(authenticate, enterpriseriskreport)
router.route('/cpb/search/creditenquiry').post(authenticate, creditenquiry)
router.route('/cpb/search/idvkyc').post(authenticate, idvkyc)
router.route('/cpb/search/traceenquiry').post(authenticate, traceenquiry)
router.route('/cpb/search/trustenquiry').post(authenticate, trustenquiry)
router.route('/cpb/search/idvenquiry').post(authenticate, idvenquiry)
router.route('/cpb/search/companykyc').post(authenticate, companykyc)
router.route('/cpb/search/eagleeye').post(authenticate, eagleeye)

// Scheduled Searches
const {
    schedulepeoplelist,
    getscheduledsearches,
    cancelscheduledsearch,
    schedulecipcauditorslist,
    schedulecipcdirectorslist,
    schedulecipcenterpriseslist,
    schedulebusinessinterestenquiry,
    schedulebankaccountverification,
    schedulelifestyleauditreport,
    schedulepepslist,
    scheduleidvwithphotovalidation,
    scheduleidvwithoutphotovalidation
} = require('../../controllers/providers/cpb/schedule/schedule');

router.route('/cpb/scheduled').post(authenticate, getscheduledsearches);
router.route('/cpb/scheduled/cancel').post(authenticate, cancelscheduledsearch);
router.route('/cpb/schedule/peoplelist').post(authenticate, schedulepeoplelist); 
router.route('/cpb/schedule/cipcauditorslist').post(authenticate, schedulecipcauditorslist);
router.route('/cpb/schedule/cipcdirectorslist').post(authenticate, schedulecipcdirectorslist);
router.route('/cpb/schedule/cipcenterpriseslist').post(authenticate, schedulecipcenterpriseslist);
router.route('/cpb/schedule/businessinterestinquiry').post(authenticate, schedulebusinessinterestenquiry);
router.route('/cpb/schedule/bankaccountverification').post(authenticate, schedulebankaccountverification);
router.route('/cpb/schedule/lifestyleauditreport').post(authenticate, schedulelifestyleauditreport);
router.route('/cpb/schedule/pepslist').post(authenticate, schedulepepslist);
router.route('/cpb/schedule/idv/withphoto').post(authenticate, scheduleidvwithphotovalidation);
router.route('/cpb/schedule/idv/withoutphoto').post(authenticate, scheduleidvwithoutphotovalidation);

module.exports = router;