
const UsersEmployer=require('../models/UsersEmployer')
var nodemailer = require('nodemailer')

const jwt = require('jsonwebtoken')

// handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code)
    let errors = { email: '', password: '' }

    // incorrect email
    if (err.message === 'incorrect email') {
        errors.email = 'That email is not registered'
    }

    // incorrect password
    if (err.message === 'incorrect password') {
        errors.password = 'That password is incorrect'
    }
    if(err.message === 'incorrect city'){
        errors.city = 'That city is incorrect'
    }

    // duplicate email error
    if (err.code === 11000) {
        errors.email = 'That email is already registered'
        return errors
    }

    // validation errors
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        })
    }

    return errors
}

// create json web token
const maxAge = 3 * 24 * 60 * 60
const createToken = (id) => {
    return jwt.sign({ id }, 'sce secret', {
        expiresIn: maxAge
    })
}


// controller actions
module.exports.loginEmployerGet=(req,res)=>{
    res.render('loginEmployer')
}


module.exports.loginEmployerPost= async (req,res)=>{
   const { email, password } = req.body

    try {
        const user = await UsersEmployer.login(email, password)
        const token = createToken(user._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
        res.status(200).json({ user: user._id })
    }
    catch (err) {
        const errors = handleErrors(err)
        res.status(400).json({ errors })
    }


}

module.exports.signupEmployerGet =(req,res)=>{
    res.render('signupEmployer')
}

//create new emp  .
module.exports.createNewEmpPost= async (req,res)=>{
    const x=req.body
    try{
        const usersEmployer= await UsersEmployer.create(x)
        res.status(201).json(usersEmployer)
    }
    catch(err){
        const errors = handleErrors(err)
        res.status(400).json({ errors })
    }

}

module.exports.signupEmployerPost = async (req,res)=>{

    try {
        const {email,password, firstName,lastName,phoneNumber,city,street,houseNumber} = req.body
        try{
            UsersEmployer.checkExistEmail(email)
            await UsersEmployer.checkCity(city)
        }
        catch (e) {
            const errors = handleErrors(e)
            res.status(400).json({errors})
        }
        const address = new AddressEmp({city,street,houseNumber})
        console.log(address)
        const myData = new UsersEmployer({email,password, firstName,lastName,phoneNumber,address})
        myData.save()
        UsersEmployer.findOne({id:email}).then(user=>{
            res.status(201).json(user)
        })
        console.log(myData)


        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'hssce2021@gmail.com',
                pass: 'lamasce?'
            }
        })

        var mailOptions = {
            from: 'hssce2021@gmail.com',
            to: req.body.email,
            subject: 'registered successfully',
            html: '<h1>successful signup</h1>' +
                '<h3>welcome</h3>'+
                '<h3>Thanks, HouseHold</h3>'
        }

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error)
            } else {
                console.log('Email sent: ' + info.response)
            }
        })

    }
    catch (e) {
        const errors = handleErrors(e)
        res.status(400).json({errors})
    }
}



module.exports.forgotEmployerGet=(req,res)=>{
    res.render('forgotEmployer')
}

module.exports.forgotEmployerPost= async(req,res)=>{
    const { email } = req.body
    let randomstring = Math.random().toString(36).slice(-8)
    try {
        const user = await UsersEmployer.checkEmail(email)

        await UsersEmployer.findById(user._id)
            .then(user=>{

                user.password=randomstring
                user.markModified('password')
                user.save(err => console.log(err))
                console.log(user)

            })


        console.log(user)
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'hssce2021@gmail.com',
                pass: 'lamasce?'
            }
        })

        let mailOptions = {
            from: 'hssce2021@gmail.com',
            to: email,
            subject: 'password reset',
            html: '<h1>Oops silly you, did you forgot your password again?</h1>' +
                '<h3>Come on!! try harder next time!</h3>'+
                '<h3>Now we will give up for you but dont rely on it </h3>'+
                '<h2>Here is a temporary password: </h2>' + randomstring +
                '<h3>Please change it as soon as possible!</h3>'
        }
        //     text: 'Oops, what can we do with you memory, urgent course for improvement.\n' +
        //         'This time we will give up - here is a temporary password, \nplease change it as soon as possible:\n'+randomstring
        // }

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error)
            } else {
                console.log('Email sent: ' + info.response)
            }
        })

        res.status(200).json({ user: user._id })
        //return user
    }
    catch (err) {
        const errors = handleErrors(err)
        res.status(400).json({ errors })
    }

}


//
// module.exports.logoutGet=(req,res)=>{
//     res.cookie('jwt','',{maxAge:1})
//     res.redirect('/')
// }