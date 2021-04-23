const { requireHRAuth } = require('../middleware/authMiddleware')

const { Router }=require('express')
const homepageHRController=require('../controllers/HRController')

const router=Router()
router.route('/homepageHR')
    .get(requireHRAuth, homepageHRController.homepageHRGet)





module.exports=router