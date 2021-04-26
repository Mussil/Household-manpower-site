const { requireConAuth } = require('../middleware/authMiddleware')

const { Router }=require('express')
const contractorController=require('../controllers/ContractorController')

const router=Router()
router.route('/homepageContractor')
    .get(requireConAuth, contractorController.homepageContractorGet)

router.route('/leavePeriodContractor')
    .get(requireConAuth, contractorController.leavePeriodContractorGet)

router.post('/leavePeriodContractor',contractorController.leavePeriodContractorPost)




module.exports=router