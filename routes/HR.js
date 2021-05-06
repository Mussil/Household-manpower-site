// const Transaction=require('../models/Transaction')
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

/////////////////////////////////////////////////
router.route('/edit/')
    .get(requireHRAuth, homepageHRController.monitorHiringHRGet)
/////////////////////////////////////////////////

module.exports=router

//at the end - need to delete!!!!!!!!!
router.post('/createTransaction',homepageHRController.transactionPost)

////////////////
// router.route('/monitorHiringHR').get(async function(req, res) {
//     const result = await Transaction.find({})
//     console.log(result)
//     res.send('test')
// })






