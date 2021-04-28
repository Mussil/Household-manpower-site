//const UsersHR=require('../models/UsersHR')
const TransactionDB=require('../models/Transaction')

//const jwt = require('jsonwebtoken')


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