const { Router }=require('express')
const loginHRController=require('../controllers/loginHRController')

const router=Router()

router.get('/loginHR',loginHRController.loginHRGet)
router.post('/loginHR',loginHRController.loginHRPost)

router.post('/createNewHR',loginHRController.createNewHRPost)


// router.get('/loginEM',loginHRController.loginEMGet)
// router.post('/loginEM',loginHRController.loginEMPost)
//
// router.get('/loginWC',loginHRController.loginWCGet)
// router.post('/loginWC',loginHRController.loginWCPost)


router.get('/logout',loginHRController.logoutGet)


module.exports=router