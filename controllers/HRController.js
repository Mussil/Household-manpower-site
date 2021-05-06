//const UsersHR=require('../models/UsersHR')
const Transaction=require('../models/Transaction')
const UserEmployer=require('../models/UsersEmployer')
const UserContractor=require('../models/UsersContractor')



//const jwt = require('jsonwebtoken')

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
        var date = transcationResult[i].date
        var startHourShift = convertNumToHour(transcationResult[i].startHourShift)
        var endHourShift =  convertNumToHour(transcationResult[i].endHourShift)
        var startHourRec =  convertNumToHour(transcationResult[i].startHourRec)
        var endHourRec = convertNumToHour(transcationResult[i].endHourRec)
        myObject.push({'contractor': contractor, 'date': date, 'startHourShift': startHourShift, 'endHourShift': endHourShift, 'startHourRec': startHourRec, 'endHourRec': endHourRec})
    }

    // console.log(myObject)

    res.render('attendanceClockHR', {data: myObject})
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
const UsersEmployer=require('../models/UsersEmployer')
const UsersContractor=require('../models/UsersContractor')
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



