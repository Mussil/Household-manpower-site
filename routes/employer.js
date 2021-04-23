const { requireEmpAuth } = require('../middleware/authMiddleware')

const { Router }=require('express')
const homepageEmployerController=require('../controllers/EmployerController')

const router=Router()
router.route('/homepageEmployer')
    .get(requireEmpAuth, homepageEmployerController.homepageEmployerGet)



//router.get('/homepageEmployer',requireEmpAuth, homepageEmployerController.homepageEmployerGet)


module.exports=router