const express = require('express');
const router = express.Router();
const {protect} = require('../../middleware/protected/protected');

const {
    updatePorject,
    createproject,
    getprojects,
    getteamprojects,
    deleteproject,
    getsharedprojects
} = require('../../controllers/projects/projects');

router.route('/new').post(createproject);
router.route('/get').post(getprojects);
router.route('/shared').post(getsharedprojects);
router.route('/team').post(getteamprojects);
router.route('/update').post(updatePorject);
router.route('/delete').post(deleteproject);

module.exports = router;