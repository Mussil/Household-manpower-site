const UsersContractor=require('../models/UsersContractor')
const Transaction=require('../models/Transaction')
const jwt = require('jsonwebtoken')
const UserEmployer=require('../models/UsersEmployer')
const addressModel = require('../models/Address')
const Languages = require('../models/languageUser')
const JobsType = require('../models/JobType')
const bcrypt=require('bcrypt')
let nodemailer = require('nodemailer')


const handleErrors = (err) => {
    console.log(err.message)
    let errors = { email: '', password: ''}

    // incorrect email
    if (err.message === 'incorrect email') {
        errors.email = 'That email is not incorrect'
    }

    // incorrect password
    if (err.message === 'incorrect password') {
        errors.password = 'That password is incorrect'
    }
    // duplicate email error
    if (err.code === 11000) {
        errors.email = 'That email is already registered'
        //return errors
    }

    // validation errors
    // if (err.message.includes('user validation failed')) {
    //     Object.values(err.errors).forEach(({ properties }) => {
    //         errors[properties.path] = properties.message
    //     })
    // }

    return errors
}

// controller actions
module.exports.homepageContractorGet=(req,res)=>{
    const token = req.cookies.jwt
    jwt.verify(token, 'sce secret', async (err, decodedToken) => {
        if (err) {
            console.log(err.message)
        }
        else{
            var arrRecommendation = []

            Transaction.find({idContractor: decodedToken.id})
                .then(user=>{
                    for(var i=0;i<user.length;++i){
                        if(user[i].recommendation != '')
                            arrRecommendation.push(user[i].recommendation)
                    }
                    res.render('homepageContractor',{rec:arrRecommendation })
                })
                .catch(err=>{ console.log(err)})
        }
    })}

module.exports.workHistoryContractorGet=async (req,res)=>{
    const transcationResult = await Transaction.find({})
    const userEmployerResult = await UserEmployer.find({})
    const userContractorResult = await UsersContractor.find({})

    var myObject=[]

    for(var i=0;i<transcationResult.length;i++) {
        if (transcationResult[i].isShifted) {
            var date = transcationResult[i].date
            for (var j = 0; j < userContractorResult.length; j++) {
                if (String(userContractorResult[j]._id) == String(transcationResult[i].idContractor)) {
                    var contractor = userContractorResult[j].email
                }
            }
            var startHourShift = convertNumToHour(transcationResult[i].startHourShift)
            var endHourShift = convertNumToHour(transcationResult[i].endHourShift)
            var salary = Math.round(((transcationResult[i].endHourShift - transcationResult[i].startHourShift) / 60) * transcationResult[i].hourlyRate)

            // if (String(startHourShift) == 'no report') {
            //     salary = 0
            // }

            for (j = 0; j < userEmployerResult.length; j++) {
                if (String(userEmployerResult[j]._id) == String(transcationResult[i].idEmployer)) {
                    var employer = userEmployerResult[j].email
                }
            }
            if (String(employer) != String(undefined)) {
                var jobType = transcationResult[i].jobType
                var rank = transcationResult[i].rank


                myObject.push({
                    'date': date,
                    'contractor': contractor,
                    'startHourShift': startHourShift,
                    'endHourShift': endHourShift,
                    'salary': salary,
                    'employer': employer,
                    'jobType': jobType,
                    'rank': rank
                })
            }
        }
    }
    res.render('workHistoryContractor', {data: myObject})
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

module.exports.salaryDetailsContractorGet= async (req,res)=>{
    //צריכה לחשב שכר לחודש זה .
    let date = new Date()
    let firstDay = new Date(date.getFullYear(), date.getMonth(), 1)
    firstDay.setHours(0,0,0,0)
    let lastDay = new Date(date.getFullYear(), date.getMonth() +1, 0)
    lastDay.setHours(23,59,59,999)
    const token = req.cookies.jwt
    let sal=0

    jwt.verify(token, 'sce secret', async (err, decodedToken) => {
        if (err) {
            console.log(err.message)
        } else {
            console.log(decodedToken)
            //check for transaction in the start date and in the contractor-user id
            await Transaction.find({
                date: {
                    $gte: firstDay, $lte: lastDay },
                idContractor: decodedToken.id ,
            }).then(result=>{
                for (const i in result){
                    const x=result[i]
                    if(x.isShifted) {
                        sal += x.hourlyRate * (x.endHourShift - x.startHourShift)/60
                    }
                }
                res.render('salaryDetailsContractor',{'sal': Math.round(sal)})

                // eslint-disable-next-line no-unused-vars
            }).catch(result=>{
                res.render('salaryDetailsContractor',{'sal':sal,err:'There is no record of shifts for this month'})
            })



        }
    })


}

module.exports.salaryDetailsContractorPost=(req,res)=> {
    const { start,end } = req.body
    let  start1 = new Date(start)
    start1.setHours(0,0,0,0)

    let end1 = new Date(end)
    end1.setHours(23,59,59,999)
    const token = req.cookies.jwt
    let sal=0

    jwt.verify(token, 'sce secret', async (err, decodedToken) => {
        if (err) {
            console.log(err.message)
        } else {
            console.log(decodedToken)
            //check for transaction in the start date and in the contractor-user id
            await Transaction.find({
                date: {
                    $gte: start1, $lte: end1 },
                idContractor: decodedToken.id ,
            }).then(result=>{
                for (const i in result){
                    const x=result[i]
                    if(x.isShifted) {
                        sal += x.hourlyRate * (x.endHourShift - x.startHourShift)/60
                    }
                }
                if(sal!=0) {
                    res.status(201).json({'sal': Math.round(sal)})
                    console.log(sal)
                }
                else {
                    res.status(400).json({err: 'There is no record of shifts for these dates'})
                }
                // eslint-disable-next-line no-unused-vars
            }).catch(result=>{
                res.status(400).json({err:'There is no record of shifts for these dates'})

            })
        }
    })
}

module.exports.profileContractorGet=(req,res)=>{
    res.render('profileContractor')

}

module.exports.profileContractorPost = async (req, res) => {

    var {email,password, firstName, lastName, phoneNumber, city, street, houseNumber,arrLang,education,smoker,experience,hourlyRate,aboutMe,arrTypeJob,changePassword} = req.body

    const token = req.cookies.jwt
    jwt.verify(token, 'sce secret', async (err, decodedToken) => {
        if (err) {
            console.log(err.message)
        } else {

            try{
                const address = new addressModel({city, street, houseNumber})
                if(changePassword === 1){
                    const salt=await bcrypt.genSalt()
                    password=await bcrypt.hash(password, salt)
                }
                var jobTypes = []
                for (var i = 0; i < arrTypeJob.length; i++) {
                    jobTypes.push(await JobsType.create({value: arrTypeJob[i]}))
                }

                var languages = []
                for (i = 0; i < arrLang.length; ++i) {
                    languages.push(await Languages.create({value: arrLang[i]}))
                }
                const user = await UsersContractor.findOneAndUpdate({_id: decodedToken.id}, {$set:
                        {email:email,password: password, firstName: firstName,lastName: lastName,phoneNumber: phoneNumber,address: address,
                            languages:languages,education:education,smoker:smoker,experience: experience,hourlyRate:hourlyRate,
                            aboutMe: aboutMe,jobTypes: jobTypes}})
                   if(user) {
                       res.status(200).json({user: decodedToken.id})
                   }
            }
            catch (err){
                const errors = handleErrors(err)
                res.status(400).json({errors})
            }
        }
    })
}

// module.exports.profileContractorDelete = (req,res)=>{
//
//     const token = req.cookies.jwt
//     if (token) {
//         jwt.verify(token, 'sce secret', async (err, decodedToken) => {
//             if (err) {
//                 console.log(err)
//             } else {
//
//                 Transaction.deleteMany({idContractor:decodedToken.id})
//                     .then(result => {
//                         console.log(`Deleted ${result.deletedCount} transaction(s).`)
//                         UsersContractor.findByIdAndDelete(decodedToken.id)
//                             // eslint-disable-next-line no-unused-vars
//                             .then(result => {
//                                 console.log('found')
//                                 res.json({ redirect: '/logout' })
//                             })
//                             .catch(err => {
//                                 console.log(err)
//                             })
//
//                     })
//                     .catch(err => console.error(`Delete failed with error: ${err}`))
//
//
//             }
//         })
//     }
// }

module.exports.leavePeriodContractorGet=(req,res)=>{
    res.render('leavePeriodContractor')
}

module.exports.shiftReportContractorPost=(req,res)=> {




    const { start } = req.body

    let start1 = new Date(start)
    start1.setDate( start1.getDate() +1 )

    start1.setHours(0,0,0,0)
    console.log(start)
    console.log(start1)

    let end = new Date(start1)
    end.setHours(23,59,59,999)

    const token = req.cookies.jwt
    // let start2 = new Date(start)



    jwt.verify(token, 'sce secret', async (err, decodedToken) => {
            if (err) {
                console.log(err.message)
            } else {

                //check for transaction in the start date and in the contractor-user id
                await Transaction.findOne({
                    idContractor: decodedToken.id ,
                   // date:start2
                    date: {
                        $gte: start1, $lte: end }
                }).then(result=>{
                    if(result){
                        console.log('found transaction')
                       console.log(result)
                        if(result.isShifted){
                            res.status(400).json({msgError:'You have already declared a shift for this date'})

                        }
                        else if (result.approval!=1) {
                            res.status(400).json({msgError: 'You have not confirmed the transaction for this date'})
                        }
                    else {
                            res.status(201).json({result})
                        }
                    }else{//error-no transaction for the id and date
                        //console.log('no transaction')
                        //console.log(result)
                        res.status(400).json({msgError:'You can not declare a shift on a date you were not employed!'})

                    }

                })
            }


        }

    )}

module.exports.shiftReportHoursContractorPost= async (req,res)=> {
//יכניס את השעות לבסיס נתונים
    const {trans, startMin, endMin} = req.body

    await Transaction.findById(trans._id)
        .then(async result => {
            if (result.isShifted) {
                res.status(400).json({msgError: 'You have already entered a shift for this date'})
            }
            else if (result.approval!=1) {
                res.status(400).json({msgError: 'You have not confirmed the transaction for this date'})
            }
            else{

                await Transaction.updateOne({_id: trans._id},
                    {
                        startHourShift: startMin,
                        endHourShift: endMin,
                        isShifted: true
                        // eslint-disable-next-line no-unused-vars
                    },).then(updatedRows => {
                    //console.log(updatedRows)
                    res.status(201).json({msg: 'The shift was added successfully'})
                }).catch(err => {
                    res.status(400).json({msgError: 'an error occurred Try again'})
                    console.log(err)

                })
            }
        }).catch(err => {
            console.log(err)
        })




}

module.exports.leavePeriodContractorPost=(req,res)=>{

    console.log('here in server')

    const token = req.cookies.jwt
    if (token) {
        jwt.verify(token, 'sce secret', async (err, decodedToken) => {
            if (err) {
                console.log(err)
                res.status(400).json({ err })
                //next()
            } else {
                await UsersContractor.findById(decodedToken.id)
                    .then(user=>{
                        console.log(user)

                        const {start,end}=req.body

                        let end1 = new Date(end)
                        var d = new Date(start)
                        d.setDate(d.getDate() + 1)
                        for (; d <= end1; d.setDate(d.getDate() + 1)) {
                            user.leaveDates.push(new Date(d))
                        }
                        user.leaveDates.push(new Date(d))

                        user.markModified('leaveDates')
                        user.save(err => console.log(err))
                        console.log(user)
                        res.status(200).json({ user: user._id })
                    })
                //next()
            }
        })
    }

}


module.exports.workOrdersContractorGet= async (req,res)=>{


    var afterFilter=[]
    const token = req.cookies.jwt
    if (token) {
        jwt.verify(token, 'sce secret', async (err, decodedToken) => {
            if (err) {
                console.log(err)
                res.status(400).json({err})
                //next()
            } else {
                afterFilter= await Transaction.find({idContractor: decodedToken.id, approval:0})
                console.log(afterFilter)
                res.render('workOrdersContractor',{data:afterFilter})

            }
        })
    }


}

// module.exports.workOrdersContractorGet= async (req,res)=>{
//
//     const transaction = await Transaction.find({})
//     const afterFilter =[]
//     for(var i=0;i< transaction.length;++i){
//         if(!transaction[i].$isEmpty('approval')){
//             // console.log(transaction[i])
//             // console.log(transaction[i].idEmployer)
//             const employer= await UserEmployer.findById(transaction[i].idEmployer)
//                     // console.log(employer)
//                     if(employer){
//                         // console.log(transaction[i])
//                         if( transaction[i].approval==0) { //before approval
//                             afterFilter.push(transaction[i])
//                         }
//                     }
//
//
//
//
//         }
//
//     }
//
//
//     res.render('workOrdersContractor',{data:afterFilter})
// }

module.exports.detailsOfTransactionGet =  async (req,res)=>{
    const idTransaction=req.params.id


   await Transaction.findById(idTransaction)
        .then(async transcationResult=>{
            await UserEmployer.findById(transcationResult.idEmployer)
                .then(userEmployerResult=>{

                    var jobType = String(transcationResult.jobType)

                    var email = userEmployerResult.email
                    var firstName=userEmployerResult.firstName
                    var lastName=userEmployerResult.lastName
                    var date = transcationResult.date
                    var startHour = convertNumToHour(transcationResult.startHourRec)
                    var endHour = convertNumToHour(transcationResult.endHourRec)
                    // var idEmployer=transcationResult._id
                    var myObject={ jobType,firstName,lastName, email, date ,startHour,endHour,idTransaction}
                    // console.log(myObject)
                    res.render('detailsOfTransaction',myObject)

                })
    })

}


module.exports.detailsOfTransactionPost= async (req,res)=>{
    var isAccepted=req.body.isAccepted
    var idTransaction=req.body.idTransaction

    var email
    var date
    var jobType
    var firstName
    var lastName
    await Transaction.findById(idTransaction).then(async trans=>{{
        date=trans.date
        jobType=trans.jobType
        await UserEmployer.findById(trans.idEmployer).then(async emp=>{
            console.log(emp)
            email=emp.email
        })
        await UsersContractor.findById(trans.idContractor).then(cont=>{
            console.log(cont)
            firstName=cont.firstName
            lastName=cont.lastName
        })
    }})
    var str
    var isapprove

    if(isAccepted==1){
        str='The transaction is approved'
        isapprove='approved'
    }
    else if (isAccepted==2){
        str='The transaction is denied'
        isapprove='denied'
    }

    var info='The transaction on: '+date.getDate()+' '+date.getMonth()+' '+date.getFullYear()+'of '+jobType+
        '\n'+isapprove+'\n'+
        'by '+firstName+' '+lastName
    console.log(info)
    console.log(email)

    Transaction.findByIdAndUpdate(idTransaction, { approval: isAccepted },
        // eslint-disable-next-line no-unused-vars
        function (err, docs) {
            if (err) {
                res.status(400).json({msg: 'an error occurred Try again'})
            } else {
                res.status(200).json({ msg: str })
                sendEmail(email,isapprove,info)


            }
        })


}


function sendEmail(email,subject, msg){
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
        subject: subject,
        text: msg
    }


    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error)
        } else {
            console.log('Email sent: ' + info.response)
        }
    })
}

