const express = require('express');
const router = express.Router();

const {
    getteammembers,
    searchteammembers,
    updatepermissions,
    memberinformation
} = require('../../controllers/team/team');

router.route('/all').post(getteammembers);
router.route('/search').post(searchteammembers);
router.route('/permissions').post(updatepermissions);
router.route('/member/info').post(memberinformation);

module.exports = router;