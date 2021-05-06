// const Transaction=require('../models/Transaction')
const { requireHRAuth } = require('../middleware/authMiddleware')

const { Router }=require('express')
const HRController=require('../controllers/HRController')



const router=Router()
router.route('/homepageHR')
    .get(requireHRAuth, HRController.homepageHRGet)

/////////////////////////////////////////////////////////
router.route('/attendanceClockHR')
    .get(requireHRAuth, HRController.attendanceclockHRGet)

router.route('/addAContractorHR')
    .get(requireHRAuth, HRController.addAContractorHRGet)

router.route('/monitorHiringHR')
    .get(requireHRAuth, HRController.monitorHiringHRGet)

router.route('/addAContractorHR')
    .get(requireHRAuth,HRController.addAContractorHRGet)

router.route('/addAContractorHR')
    .post(requireHRAuth,HRController.addAContractorHRPost)
/////////////////////////////////////////////////////////
    .get(requireHRAuth, HRController.monitorHiringHRGet)

router.delete('/attendanceClockHR/:id',HRController.attendanceclockHRDelete)
router.post('/attendanceClockHR',HRController.attendanceclockHRPost)

//at the end - need to delete!!!!!!!!!
router.post('/createTransaction',HRController.transactionPost)

////////////////
// router.route('/monitorHiringHR').get(async function(req, res) {
//     const result = await Transaction.find({})
//     console.log(result)
//     res.send('test')
// })



//at the end - need to delete!!!!!!!!!
router.post('/createTransaction',HRController.transactionPost)



module.exports=router




