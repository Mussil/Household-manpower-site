// const TransactionDB=require('../models/Transaction')
const nodemailer = require('nodemailer')
const UsersEmployer=require('../models/UsersEmployer')
const UsersContractor=require('../models/UsersContractor')
const addressModel = require('../models/Address')
const Bank = require('../models/Bank')
const Languages = require('../models/languageUser')
const JobsType = require('../models/JobType')
//const UsersHR=require('../models/UsersHR')
const Transaction=require('../models/Transaction')



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
    // duplicate email error
    if (err.code === 11000) {
        errors.email = 'that email is already registered'
        return errors}

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


module.exports.attendanceclockHRGet=async (req,res)=>{
    const transcationResult = await Transaction.find({})
    const userContractorResult = await UserContractor.find({})

    const myObject = []

    for(var i=0; i<transcationResult.length;i++){
        for(var j=0;j<userContractorResult.length ;j++){
            if(String(transcationResult[i].idContractor) == String(userContractorResult[j]._id)){
                var contractor = userContractorResult[j].email
            }
        }
        var transactionId = transcationResult[i]._id
        var date = transcationResult[i].date
        var startHourShift = convertNumToHour(transcationResult[i].startHourShift)
        var endHourShift =  convertNumToHour(transcationResult[i].endHourShift)
        var startHourRec =  convertNumToHour(transcationResult[i].startHourRec)
        var endHourRec = convertNumToHour(transcationResult[i].endHourRec)
        myObject.push({'transactionId': transactionId, 'contractor': contractor, 'date': date, 'startHourShift': startHourShift, 'endHourShift': endHourShift, 'startHourRec': startHourRec, 'endHourRec': endHourRec})
    }

    // console.log(myObject)

    res.render('attendanceClockHR', {data: myObject})
}

module.exports.attendanceclockHRPost= async (req,res)=>{
    const {id, startMin, endMin} = req.body
    console.log(startMin)
    console.log(endMin)
    console.log(id)
    await Transaction.findById(id)
        .then(async result => {
                await Transaction.updateOne({_id: id},
                    {
                        startHourShift: startMin,
                        endHourShift: endMin,
                        isShifted: true
                    },).then(updatedRows => {
                    console.log(updatedRows)
                   // res.redirect('/attendanceClockHR')
                     res.status(201).json({msg: 'The shift was changed successfully'})

                }).catch(err => {
                    res.status(400).json({msgError: 'an error occurred Try again'})
                    console.log(err)

                })

        }).catch(err => {
            console.log(err)
        })


}


module.exports.attendanceclockHRDelete= (req,res)=>{
    const id =req.params.id
    console.log('here in HRController')
    console.log(id)
    Transaction.findByIdAndDelete(id)
        .then(result => {

            res.json({ redirect: '/attendanceClockHR' })
        })
        .catch(err => {
            console.log(err)
        })
}

function convertNumToHour(num){
    var hours = String(Math.floor(num / 60))

    if(hours.length<2){
        hours = '0' + String(hours)
    }

    var minutes = String(num % 60)

    if(minutes.length<2){
        minutes = '0' + String(minutes)
    }

    var result = hours + ':' + minutes

    if(String(result) == 'NaN:NaN'){
        result = 'no report'
    }

    return result
}

module.exports.addAContractorHRGet=(req,res)=>{
    res.render('addAContractorHR')
}



///////////////\\\\\\\\\\\\\\\\\\\\\\
module.exports.monitorHiringHRGet=async (req, res) =>{
    const transcationResult = await Transaction.find({})
    const userEmployerResult = await UserEmployer.find({})
    const userContractorResult = await UserContractor.find({})

    const myObject = []

    for(var i=0;i<transcationResult.length;i++){

        for(var j = 0; j<userContractorResult.length;j++){
            if(String(transcationResult[i].idContractor)==String(userContractorResult[j]._id)){
                var worker = userContractorResult[j].email

                // var jobType = 'remind myself to change it'
            }
        }
        var jobType = String(transcationResult[i].jobType)

        for(var k = 0; k<userEmployerResult.length; k++){
            if(String(transcationResult[i].idEmployer)==String(userEmployerResult[k]._id)){
                var employer = userEmployerResult[k].email
            }
        }
        var dateTransaction = transcationResult[i].date
        var currentFee = ((transcationResult[i].endHourShift - transcationResult[i].startHourShift)/60) * transcationResult[i].hourlyRate
        if(String(currentFee) == 'NaN'){
            currentFee = 'shift was not reported yet'
        }
        myObject.push({'worker':worker, 'jobType': jobType, 'employer' :employer, 'date': dateTransaction , 'currentFee':currentFee})
    }

    // console.log(myObject)
    res.render('monitorHiringHR', {data: myObject})
}
///////////////\\\\\\\\\\\\\\\\\\\\\\

//at the end- delete!!!!!!!!

//const mongoose = require('mongoose')
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
            arrLang,
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
        for (i = 0; i < arrLang.length; ++i) {
            languages.push(await Languages.create({value: arrLang[i]}))
        }


        const address = new addressModel({city, street, houseNumber})
        const bank = new Bank({branch, accountNumber, bankName})
        // var myData = new UsersContractor({
        //     email, password, firstName, lastName, phoneNumber, address, bank,
        //     gender, languages, education, smoker, experience, hourlyRate, picture, form101, birthday, aboutMe, jobTypes
        // })
        var myData=
            {
                     email, password, firstName, lastName, phoneNumber, address, bank,
                    gender, languages, education, smoker, experience, hourlyRate, picture, form101, birthday, aboutMe, jobTypes
                }


        const user = await UsersContractor.create(myData)
        res.status(201).json({user })

        // await myData.save(function (err,doc){
       //     if(err)
       //         console.log(err.message)
       //      else{
       //          res.status(200).json({doc})
       //     }
       //  })

        // console.log(myData + 'mydata')
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

