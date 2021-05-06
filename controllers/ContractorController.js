const UsersContractor=require('../models/UsersContractor')
const jwt = require('jsonwebtoken')

const Transaction=require('../models/Transaction')
const UserEmployer=require('../models/UsersEmployer')



// controller actions
module.exports.homepageContractorGet=(req,res)=>{
    res.render('homepageContractor')
}

module.exports.workHistoryContractorGet=async (req,res)=>{
    const transcationResult = await Transaction.find({})
    const userEmployerResult = await UserEmployer.find({})
    const userContractorResult = await UsersContractor.find({})

    myObject=[]

    for(var i=0;i<transcationResult.length;i++){
        var date = transcationResult[i].date
        for(var j=0;j<userContractorResult.length;j++){
            if(String(userContractorResult[j]._id)==String(transcationResult[i].idContractor)){
                var contractor = userContractorResult[j].email
            }
        }
        var startHourShift = convertNumToHour(transcationResult[i].startHourShift)
        var endHourShift = convertNumToHour(transcationResult[i].endHourShift)
        var salary = ((transcationResult[i].endHourShift-transcationResult[i].startHourShift)/60)*transcationResult[i].hourlyRate

        if(String(startHourShift) == 'no report'){
            salary = ''
        }

        for(var j=0;j<userEmployerResult.length;j++){
            if(String(userEmployerResult[j]._id)==String(transcationResult[i].idEmployer)){
                var employer = userEmployerResult[j].email
            }
        }
        var jobType = transcationResult[i].jobType
        var rank = transcationResult[i].rank

        myObject.push({'date': date, 'contractor': contractor, 'startHourShift': startHourShift, 'endHourShift':endHourShift, 'salary':salary, 'employer': employer, 'jobType': jobType, 'rank':rank})
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

module.exports.salaryDetailsContractorGet=(req,res)=>{
    res.render('salaryDetailsContractor')
}

module.exports.profileContractorGet=(req,res)=>{
    res.render('profileContractor')
}


module.exports.leavePeriodContractorGet=(req,res)=>{
    res.render('leavePeriodContractor')
}

module.exports.leavePeriodContractorPost=(req,res)=>{

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
