//const UsersHR=require('../models/UsersHR')
const Transaction=require('../models/Transaction')

///////////////\\\\\\\\\\\\\\\\\\\\\\
const UserEmployer=require('../models/UsersEmployer')
const UserContractor=require('../models/UsersContractor')
///////////////\\\\\\\\\\\\\\\\\\\\\\

//const jwt = require('jsonwebtoken')

module.exports.homepageHRGet=(req,res)=>{
    res.render('homepageHR')
}


module.exports.attendanceclockHRGet=(req,res)=>{
    res.render('attendanceClockHR')
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
                var jobType = userContractorResult[j].jobTypes
                // var jobType = 'remind myself to change it'
            }
        }
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
        myObject.push({'Worker':worker, 'JobType': jobType, 'Employer' :employer, 'Date': dateTransaction , 'CurrentFee':currentFee})
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



