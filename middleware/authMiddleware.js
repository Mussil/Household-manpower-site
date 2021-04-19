const jwt = require('jsonwebtoken')
const UsersHR=require('../models/UsersHR')

const requireHRAuth =  (req, res, next) => {
    const token = req.cookies.jwt

    // check json web token exists & is verified
    if (token) {
        jwt.verify(token, 'sce secret', async (err, decodedToken) => {
            if (err) {
                console.log(err.message)
                res.redirect('/loginHR')
            } else {
                console.log(decodedToken)
                //check that the cookie is for HR
                if(await UsersHR.findById(decodedToken.id)){
                    next()
                }
                else{
                    res.redirect('/loginHR')

                }
            }
        })
    } else {
        res.redirect('/loginHR')
    }
}


// check current user
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt
    if (token) {
        jwt.verify(token, 'sce secret', async (err, decodedToken) => {
            if (err) {
                res.locals.user = null
                next()
            } else {
                let user = await UsersHR.findById(decodedToken.id)
                res.locals.user = user
                next()
            }
        })
    } else {
        res.locals.user = null
        next()
    }
}


module.exports = { requireHRAuth, checkUser }