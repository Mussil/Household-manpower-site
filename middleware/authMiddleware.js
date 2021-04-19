const jwt = require('jsonwebtoken')
const UsersHR=require('../models/UsersHR')

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt

    // check json web token exists & is verified
    if (token) {
        jwt.verify(token, 'sce secret', (err, decodedToken) => {
            if (err) {
                console.log(err.message)
                res.redirect('/loginHR')
            } else {
                console.log(decodedToken)
                if(UsersHR.findOne({id: decodedToken.id})){
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

module.exports = { requireAuth }