
const { requireEmpAuth } = require('../middleware/authMiddleware')

const { Router }=require('express')
const EmployerController=require('../controllers/EmployerController')

const router=Router()
router.route('/homepageEmployer')
    .get(requireEmpAuth, EmployerController.homepageEmployerGet)

////////////////////////////////////////////////////
router.route('/workHistoryEmployer')
    .get(requireEmpAuth, EmployerController.workHistoryEmployerGet)

router.route('/profileEmployer')
   .get(requireEmpAuth,EmployerController.profileEmployerGet)

router.delete('/profileEmployer', EmployerController.profileEmployerDelete)

router.route('/profileEmployerEdit')
    .get(requireEmpAuth, EmployerController.profileEmployerEditGet)

router.route('/rateContractorInEmployer/:idTran')
    .get(requireEmpAuth, EmployerController.rateContractorInEmployerGet)
////////////////////////////////////////////////////

//router.get('/homepageEmployer',requireEmpAuth, homepageEmployerController.homepageEmployerGet)
router.route('/viewEmployeesEmployer/:typeOfJob')
    .get(requireEmpAuth, EmployerController.viewEmployeesGet)

router.route('/detailsOfContractor/:id')
    .get(requireEmpAuth, EmployerController.detailsOfContractorGet)


router.post('/detailsOfContractor', EmployerController.detailsOfContractorPost)
router.post('/detailsOfContractorHours', EmployerController.detailsOfContractorHoursPost)


router.post('/rateContractor', EmployerController.rateContractorPost)



module.exports=router