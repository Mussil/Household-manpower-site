const { Router }=require('express')
const loginHRController=require('../controllers/loginHRController')
const loginEmployerController=require('../controllers/AuthEmployerController')

const router=Router()

//HR
router.get('/loginHR',loginHRController.loginHRGet)
router.post('/loginHR',loginHRController.loginHRPost)

router.post('/createNewHR',loginHRController.createNewHRPost)


//employer
router.get('/loginEmployer',loginEmployerController.loginEmployerGet)
router.post('/loginEmployer',loginEmployerController.loginEmployerPost)
router.post('/createNewEmp',loginEmployerController.createNewEmpPost)

//
// router.get('/loginWC',loginHRController.loginWCGet)
// router.post('/loginWC',loginHRController.loginWCPost)

//logout
router.get('/logout',loginHRController.logoutGet)


module.exports=router