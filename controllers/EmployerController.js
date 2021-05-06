// controller actions

const usersEmp = require('../models/UsersEmployer')
const addrEmp = require('../models/Address')
const jwt = require('jsonwebtoken')

const handleErrors = (err) => {
    console.log(err.message)
    let errors = { email: '', password: '' ,firstName: '', lastName: '',phoneNumber: '',city:''}

    // incorrect email
    if (err.message === 'incorrect email') {
        errors.email = 'That email is not incorrect'
    }

    // incorrect password
    if (err.message === 'incorrect password') {
        errors.password = 'That password is incorrect'
    }

    if(err.message === 'incorrect firstName'){
        errors.firstName = 'That first is incorrect'
    }


    // validation errors
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        })
    }

    return errors
}

module.exports.homepageEmployerGet=(req,res)=>{
    res.render('homepageEmployer')
}
///////////////////////////////////!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
module.exports.workHistoryEmployerGet=(req,res)=>{
    res.render('workHistoryEmployer')
}

module.exports.profileEmployerDetailsGet=(req,res)=>{
    res.render('profileEmployerDetails')
}

module.exports.profileEmployerGet=(req,res)=>{
    res.render('profileEmployer')

}

module.exports.profileEmployerPost = async (req,res)=> {

    // const {email, password, firstName, lastName, phoneNumber, city, street, houseNumber} = req.body
    const token = req.cookies.jwt
    if (token) {
        jwt.verify(token, 'sce secret', async (err, decodedToken) => {
                if (err) {
                    console.log(err)
                } else {
                    usersEmp.findOneAndRemove({_id: decodedToken.id}).then(user =>{
                        if(user)
                            res.send('user?')
                        else res.render('/')
                    })
                }
        })
    }

}
//     const address = new addrEmp({city, street, houseNumber})
//
//     const token = req.cookies.jwt
//     if (token) {
//         jwt.verify(token, 'sce secret', async (err, decodedToken) => {
//                 if (err) {
//                     console.log(err)
//                 } else {
//                     usersEmp.findOneAndUpdate({_id: decodedToken.id},
//                         {
//                             $set: {
//                                 email: email,
//                                 password: password,
//                                 firstName: firstName,
//                                 lastName: lastName,
//                                 phoneNumber: phoneNumber,
//                                 address: address
//                             }
//                         })
//                         .then(user => {
//                             if (user) {
//                                 res.render('homepageEmployer', {user})
//                             } else {
//                                 res.send('we have error..')
//                             }
//                         })
//                 }
//             })
//     }
// }