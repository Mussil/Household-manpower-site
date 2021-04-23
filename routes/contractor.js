const { requireConAuth } = require('../middleware/authMiddleware')

const { Router }=require('express')
const contractorController=require('../controllers/ContractorController')

const router=Router()
router.route('/homepageContractor')
    .get(requireConAuth, contractorController.homepageContractorGet)





module.exports=router