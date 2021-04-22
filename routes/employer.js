//const { requireEmpAuth } = require('../middleware/authMiddleware')

const { Router }=require('express')
const homepageEmployerController=require('../controllers/EmployerController')

const router=Router()

router.get('/homepageEmployer', homepageEmployerController.homepageEmployerGet)


module.exports=router