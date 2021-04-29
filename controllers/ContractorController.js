const UsersContractor=require('../models/UsersContractor')
const Transaction=require('../models/Transaction')

const jwt = require('jsonwebtoken')


// controller actions
module.exports.homepageContractorGet=(req,res)=>{
    res.render('homepageContractor')
}

module.exports.workHistoryContractorGet=(req,res)=>{
    res.render('workHistoryContractor')
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


// var moment = require('moment') // require
// moment().format()

module.exports.shiftReportContractorPost= (req,res)=> {

    //צריכה לבדוק תקינות של התאריך של המשמרת
    //להוסיף לבסיס נתונים
    //במידה ויש עסקה לתאריך זה
    //במידה ואין משמרת כבר בתאריך זה


    const { start } = req.body

    var start1 = new Date(start)
    start1.setHours(0,0,0,0)

    var end = new Date(start)
    end.setHours(23,59,59,999)

    const token = req.cookies.jwt

        jwt.verify(token, 'sce secret', async (err, decodedToken) => {
            if (err) {
                console.log(err.message)
            } else {
                console.log(decodedToken)
                //check for transaction in the start date and in the contractor-user id
                await Transaction.findOne({
                    idContractor: decodedToken.id ,
                    date: {
                        $gte: start1, $lte: end }
                }).then(result=>{
                    if(result){
                        //console.log('found transaction')
                       // console.log(result)
                        if(result.isShifted){
                            res.status(400).json({msgError:'You have already declared a shift for this date'})

                        }else {
                            res.status(201).json({result})
                        }
                    }else{//error-no transaction for the id and date
                        //console.log('no transaction')
                        //console.log(result)
                        res.status(400).json({msgError:'You can not declare a shift on a date you were not employed!'})

                    }

                })



            }
        })

    //res.status(400).json({ })








}

module.exports.shiftReportHoursContractorPost= async (req,res)=> {
//יכניס את השעות לבסיס נתונים
    const {trans, startMin, endMin} = req.body

    await Transaction.findById(trans._id)
        .then(async result => {
            if (result.isShifted) {
                res.status(400).json({msgError: 'You have already entered a shift for this date'})
            }
            else{

                await Transaction.updateOne({_id: trans._id},
                    {
                        startHourShift: startMin,
                        endHourShift: endMin,
                        isShifted: true
                    },).then(updatedRows => {
                    console.log(updatedRows)
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

                        var end1 = new Date(end)
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

