const jwt = require('jsonwebtoken')
const UsersHR=require('../models/UsersHR')
const UsersEmployer=require('../models/UsersEmployer')
const UsersContractor=require('../models/UsersContractor')

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


const requireEmpAuth =  (req, res, next) => {
    const token = req.cookies.jwt

    // check json web token exists & is verified
    if (token) {
        jwt.verify(token, 'sce secret', async (err, decodedToken) => {
            if (err) {
                console.log(err.message)
                res.redirect('/loginEmployer')
            } else {
                console.log(decodedToken)
                //check that the cookie is for HR
                if(await UsersEmployer.findById(decodedToken.id)){
                    next()
                }
                else{
                    res.redirect('/loginEmployer')

                }
            }
        })
    } else {
        res.redirect('/loginEmployer')
    }
}


const requireConAuth =  (req, res, next) => {
    const token = req.cookies.jwt

    // check json web token exists & is verified
    if (token) {
        jwt.verify(token, 'sce secret', async (err, decodedToken) => {
            if (err) {
                console.log(err.message)
                res.redirect('/loginContractor')
            } else {
                console.log(decodedToken)
                //check that the cookie is for HR
                if(await UsersContractor.findById(decodedToken.id)){
                    next()
                }
                else{
                    res.redirect('/loginContractor')

                }
            }
        })
    } else {
        res.redirect('/loginContractor')
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
                if (user==null)
                    user = await UsersContractor.findById(decodedToken.id)
                if (user==null)
                    user = await UsersEmployer.findById(decodedToken.id)

                res.locals.user = user
                next()
            }
        })
    } else {
        res.locals.user = null
        next()
    }
}


module.exports = { checkUser, requireHRAuth,requireEmpAuth,requireConAuth}