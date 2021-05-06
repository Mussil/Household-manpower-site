const TransactionDB=require('../models/Transaction')
const nodemailer = require('nodemailer')
const UsersEmployer=require('../models/UsersEmployer')
const UsersContractor=require('../models/UsersContractor')
const addressModel = require('../models/Address')
const Bank = require('../models/Bank')
const Languages = require('../models/languageUser')
const JobsType = require('../models/JobType')


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

module.exports.homepageHRGet=(req,res)=>{
    res.render('homepageHR')
}

/////////////////////////////////////////////////
module.exports.attendanceclockHRGet=(req,res)=>{
    res.render('attendanceClockHR')
}

module.exports.addAContractorHRGet=(req,res)=>{
    res.render('addAContractorHR')
}

module.exports.monitorHiringHRGet=(req,res)=>{
    res.render('monitorHiringHR')
}
/////////////////////////////////////////////



//at the end- delete!!!!!!!!

module.exports.transactionPost= async (req,res)=>{

    let emp
    let con

    await UsersContractor.findById('6086f2955bd8042aa0a21160')
        .then(user=>{
            //console.log(user)
            con=user
        })
    await UsersEmployer.findById('607fd32da1a5c01f3cbb028c')
        .then(user=>{
            //console.log(user)
            emp=user
        })

    const x= {
        idContractor: con._id,
        idEmployer:emp._id,
        date: new Date(),
        hourlyRate: 100,
        startHourRec:100,
        endHourRec:1220

    }


    //const x=req.body
    try{
        const transaction= await TransactionDB.create(x)
        res.status(201).json(transaction)
    }
    catch(err){
        console.log(err)
        // const errors = handleErrors(err)
        res.status(400).json({ err })
    }

}

module.exports.addAContractorHRPost =async (req,res)=> {


    try {
        const {
            email,
            password,
            firstName,
            lastName,
            phoneNumber,
            city,
            street,
            houseNumber,
            branch,
            accountNumber,
            bankName,
            gender,
            arrLanguages,
            education,
            smoker,
            experience,
            hourlyRate,
            picture,
            form101,
            birthday,
            aboutMe,
            arrTypeJob
        } = req.body

        var jobTypes = []
        for (var i = 0; i < arrTypeJob.length; i++) {
            jobTypes.push(await JobsType.create({value: arrTypeJob[i]}))
        }

        var languages = []
        for (i = 0; i < arrLanguages.length; ++i) {
            languages.push(await Languages.create({value: arrLanguages[i]}))
        }

        console.log(jobTypes + ' arr')
        console.log(languages + ' lan')

        const address = new addressModel({city, street, houseNumber})
        const bank = new Bank({branch, accountNumber, bankName})
        var myData = new UsersContractor({
            email, password, firstName, lastName, phoneNumber, address, bank,
            gender, languages, education, smoker, experience, hourlyRate, picture, form101, birthday, aboutMe, jobTypes
        })
        myData.save()
        // UsersContractor.findOne({email: email}).then(user =>{
        //     if(user) {
        //         console.log('save?')
        //         user.picture.data = fs.readFileSync(picture, picture.data)
        //         user.picture.contentType = 'image/*'
        //         user.save(function (err) {
        //             if(err)
        //                 console.log(err)
        //         })
        //     }
        // })
        console.log(myData + 'mydata')
        //הדפסה לעובד קבלן שעובד טוב
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
            html: '<h1>Welcome</h1>' +
                '<h3>Hope you find a good job</h3>' +
                '<h3>Thanks, HouseHold</h3>'
        }

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error)
            } else {
                console.log('Email sent: ' + info.response)
            }
        })

    } catch (e) {
        const errors = handleErrors(e)
        res.status(400).json({errors})
    }

}
