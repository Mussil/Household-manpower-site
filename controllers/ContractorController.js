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
                if(sal!=0)
                    res.status(201).json({'sal': Math.round(sal)})
                else
                    res.status(400).json({err:'There is no record of shifts for these dates'})

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


module.exports.leavePeriodContractorGet=(req,res)=>{
    res.render('leavePeriodContractor')
}

module.exports.profileContractorGet=(req,res)=>{
    res.render('profileContractor')
}

module.exports.profileContractorPost = async (req,res)=> {

    const token = req.cookies.jwt
    if (token) {
        jwt.verify(token, 'sce secret', async (err, decodedToken) => {
            if (err) {
                console.log(err)
            } else {
                UsersContractor.findOneAndRemove({_id: decodedToken.id}).then(user =>{
                    if(user)
                        res.redirect('/logout')
                })
            }
        })
    }

    //
    // const {email, password,firstName,lastName,phoneNumber,city,street,houseNumber,
    //     gender1,language1,education1,smoke1,experience,hourlyRate,picture,form101,aboutMe, jobs
    // } = req.body
    // const address = new addrsCon({city, street, houseNumber})
    //
    // const token = req.cookies.jwt
    // if (token) {
    //     jwt.verify(token, 'sce secret', async (err, decodedToken) => {
    //         if (err) {
    //             console.log(err)
    //         } else {
    //             UsersContractor.findOneAndUpdate({_id: decodedToken.id},
    //                 {
    //                     $set: {
    //                         email: email,
    //                         password: password,
    //                         firstName: firstName,
    //                         lastName: lastName,
    //                         phoneNumber: phoneNumber,
    //                         address: address,
    //                         gender: gender1,
    //                         languages: language1,
    //                         education: education1,
    //                         smoker:smoke1,
    //                         experience:experience,
    //                         hourlyRate: hourlyRate,
    //                         picture: picture,
    //                         form101: form101,
    //                         aboutMe: aboutMe,
    //                         jobTypes:jobs
    //                     }
    //                 })
    //                 .then(user => {
    //                     if (user) {
    //                         res.render('homepageContractor', {user})
    //                     } else {
    //                         res.send('we have error..')
    //                     }
    //                 })
    //         }
    //     })
    // }
}

module.exports.shiftReportContractorPost=(req,res)=> {

    //צריכה לבדוק תקינות של התאריך של המשמרת
    //להוסיף לבסיס נתונים
    //במידה ויש עסקה לתאריך זה
    //במידה ואין משמרת כבר בתאריך זה


    const { start } = req.body

    let start1 = new Date(start)
    start1.setHours(0,0,0,0)

    let end = new Date(start)
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


            }

        )
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

