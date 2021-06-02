
const { requireConAuth } = require('../middleware/authMiddleware')

const { Router }=require('express')
const contractorController=require('../controllers/ContractorController')

const router=Router()
router.route('/homepageContractor')
    .get(requireConAuth, contractorController.homepageContractorGet)

router.route('/workHistoryContractor')
    .get(requireConAuth, contractorController.workHistoryContractorGet)


router.route('/salaryDetailsContractor')
    .get(requireConAuth, contractorController.salaryDetailsContractorGet)

router.post('/salaryDetailsContractor', contractorController.salaryDetailsContractorPost)

router.route('/profileContractor')
    .get(requireConAuth,contractorController.profileContractorGet)

router.route('/profileContractor')
    .post(requireConAuth, contractorController.profileContractorPost)

// router.delete('/profileContractor', contractorController.profileContractorDelete)

router.route('/leavePeriodContractor')
    .get(requireConAuth, contractorController.leavePeriodContractorGet)

router.post('/leavePeriodContractor', contractorController.leavePeriodContractorPost)
router.post('/shiftReportContractor', contractorController.shiftReportContractorPost)
router.post('/shiftReportHoursContractor', contractorController.shiftReportHoursContractorPost)



router.route('/workOrdersContractor')
    .get(requireConAuth, contractorController.workOrdersContractorGet)
router.route('/detailsOfTransaction/:id')
    .get(requireConAuth, contractorController.detailsOfTransactionGet)
router.post('/detailsOfTransaction', contractorController.detailsOfTransactionPost)




module.exports=router