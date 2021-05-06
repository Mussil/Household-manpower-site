// controller actions

//const UsersHR=require('../models/UsersHR')
const Transaction=require('../models/Transaction')
const UserEmployer=require('../models/UsersEmployer')
const UserContractor=require('../models/UsersContractor')

module.exports.homepageEmployerGet= (req,res)=>{
    res.render('homepageEmployer')
}
///////////////////////////////////
module.exports.workHistoryEmployerGet=async (req,res)=>{
    const transcationResult = await Transaction.find({})
    const userEmployerResult = await UserEmployer.find({})
    const userContractorResult = await UserContractor.find({})

    res.render('workHistoryEmployer', {transactionData: transcationResult, employerData: userEmployerResult, contractorData: userContractorResult})
}

module.exports.profileEmployerGet=(req,res)=>{
    res.render('profileEmployer')
}
//////////////////////////////////
