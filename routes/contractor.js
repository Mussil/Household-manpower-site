
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


router.route('/profileContractor')
    .get(requireConAuth,contractorController.profileContractorGet)

router.delete('/profileContractor', contractorController.profileContractorDelete)

router.route('/profileContractorEdit')
    .get(requireConAuth, contractorController.profileContractorEditGet)

router.route('/leavePeriodContractor')
    .get(requireConAuth, contractorController.leavePeriodContractorGet)

router.post('/leavePeriodContractor', contractorController.leavePeriodContractorPost)
router.post('/shiftReportContractor', contractorController.shiftReportContractorPost)
router.post('/shiftReportContractor', contractorController.shiftReportHoursContractorPost)

module.exports=router