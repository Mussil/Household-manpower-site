const { requireHRAuth } = require('../middleware/authMiddleware')

const { Router }=require('express')
const homepageHRController=require('../controllers/HRController')

const router=Router()
router.route('/homepageHR')
    .get(requireHRAuth, homepageHRController.homepageHRGet)

/////////////////////////////////////////////////////////
router.route('/attendanceClockHR')
    .get(requireHRAuth, homepageHRController.attendanceclockHRGet)

router.route('/addAContractorHR')
    .get(requireHRAuth, homepageHRController.addAContractorHRGet)

router.route('/monitorHiringHR')
    .get(requireHRAuth, homepageHRController.monitorHiringHRGet)
/////////////////////////////////////////////////////////

module.exports=router