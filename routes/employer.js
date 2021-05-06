
const { requireEmpAuth } = require('../middleware/authMiddleware')

const { Router }=require('express')
const EmployerController=require('../controllers/EmployerController')

const router=Router()
router.route('/homepageEmployer')
    .get(requireEmpAuth, EmployerController.homepageEmployerGet)

router.route('/profileEmployerDetails')
    .get(requireEmpAuth,EmployerController.profileEmployerDetailsGet)

////////////////////////////////////////////////////
router.route('/workHistoryEmployer')
    .get(requireEmpAuth, EmployerController.workHistoryEmployerGet)

router.route('/profileEmployer')
    .get(requireEmpAuth, EmployerController.profileEmployerGet)

router.route('/profileEmployer')
   .post(requireEmpAuth,EmployerController.profileEmployerPost)

////////////////////////////////////////////////////

//router.get('/homepageEmployer',requireEmpAuth, homepageEmployerController.homepageEmployerGet)


module.exports=router