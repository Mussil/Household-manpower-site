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


module.exports.shiftReportContractorPost=(req,res)=> {

    //צריכה לבדוק תקינות של התאריך של המשמרת
    //להוסיף לבסיס נתונים
    //במידה ויש עסקה לתאריך זה
    //במידה ואין משמרת כבר בתאריך זה



    const token = req.cookies.jwt
    if (token) {
        jwt.verify(token, 'sce secret', async (err, decodedToken) => {
            if (err) {
                console.log(err)
                //next()
            } else {
                const {start}=req.body
                var d = new Date(start)

                Transaction.find({idContractor: decodedToken.id , date:{
                        $gte: d,
                        $lt: d.setDate(d.getDate() + 1)
                    } },function(err,result){
                    if (err) {
                        res.send(err)
                    } else {
                        console.log('dkfns')
                        res.send(result)
                    }

                })



            }
        })
    }


}

module.exports.shiftReportHoursContractorPost=(req,res)=> {
//יכניס את השעות לבסיס נתונים
    console.log(req)
    res('h')
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

