// controller actions
const UsersContractor=require('../models/UsersContractor')
const Transaction=require('../models/Transaction')
const UserEmployer = require('../models/UsersEmployer')
const addressModel = require('../models/Address')
const jwt = require('jsonwebtoken')
const bcrypt=require('bcrypt')


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
        errors.email = 'that email is already registered'
        //return errors
    }

    // validation errors
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        })
    }

    return errors
}


module.exports.homepageEmployerGet= (req,res)=>{
    res.render('homepageEmployer')
}

module.exports.rateContractorInEmployerGet= (req,res)=>{
    res.render('rateContractorInEmployer')
}


module.exports.workHistoryEmployerGet=async (req,res)=>{
    const transcationResult = await Transaction.find({})
    // const userEmployerResult = await UserEmployer.find({})
    const userContractorResult = await UsersContractor.find({})

    var myObject = []

    for(var i=0; i<transcationResult.length;i++) {
        if(transcationResult[i].isShifted){
            for(var j=0; j<userContractorResult.length; j++) {
                if(String(transcationResult[i].idContractor) == String(userContractorResult[j]._id)) {
                    var id = transcationResult[i]._id

                    var contractor = userContractorResult[j].email

                    var jobType = transcationResult[i].jobType

                    //var dateTransaction = (transcationResult[i].date).toLocaleDateString('en-GB')
                    var dateTransaction = (transcationResult[i].date)

                    var rank = transcationResult[i].rank

                    var currentFee = Math.round(((transcationResult[i].endHourShift - transcationResult[i].startHourShift)/60) * transcationResult[i].hourlyRate)

                    var idEmployer = transcationResult[i].idEmployer

                    if(String(currentFee) == 'NaN') {
                        currentFee = 'shift was not reported yet'
                    }

                    myObject.push({'id': id, 'Worker':contractor, 'JobType': jobType, 'date': dateTransaction , 'Rank':rank,  'CurrentFee':currentFee, 'idEmployer': idEmployer})
                }

            }
        }
    }

    // console.log(req)
    // console.log(myObject)
    res.render('workHistoryEmployer', {data: myObject})
}

module.exports.profileEmployerGet=(req,res)=>{
    res.render('profileEmployer')
}

module.exports.profileEmployerPost = async (req, res) => {

    var {email,password, firstName, lastName, phoneNumber, city, street, houseNumber,changePassword} = req.body

    const token = req.cookies.jwt
    jwt.verify(token, 'sce secret', async (err, decodedToken) => {
        if (err) {
            console.log(err.message)
        } else {
            try {
                const address = new addressModel({city, street, houseNumber})
                if(changePassword === 1){
                    const salt=await bcrypt.genSalt()
                    password=await bcrypt.hash(password, salt)
                }
                await UserEmployer.findOneAndUpdate({_id: decodedToken.id}, {$set: {email, password, firstName, lastName, phoneNumber,address }})
                    .then(user=>{
                        res.status(200).json({user: user._id })
                    })
            }
            catch (err){
                const errors = handleErrors(err)
                res.status(400).json({errors})
            }
        }
    })
}

// module.exports.profileEmployerDelete=(req,res)=>{
//     console.log('here in server delete')
//     const token = req.cookies.jwt
//     if (token) {
//         jwt.verify(token, 'sce secret', async (err, decodedToken) => {
//             if (err) {
//                 console.log(err)
//             } else {
//
//                 Transaction.deleteMany({idEmployer:decodedToken.id})
//                     .then(result => {
//                         console.log(`Deleted ${result.deletedCount} transaction(s).`+ decodedToken.id)
//                         UserEmployer.findByIdAndDelete(decodedToken.id)
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

module.exports.viewEmployeesGet=async (req,res)=>{

    const typeOfJob=req.params.typeOfJob
    console.log(typeOfJob)

    const usersContractorResult = await UsersContractor.find({})
    const afterFilter =[]

    for(var i=0;i< usersContractorResult.length;++i){
        if(!usersContractorResult[i].$isEmpty('jobTypes')){
            const arrJobTypes=usersContractorResult[i].jobTypes
            for ( var j=0 ; j<arrJobTypes.length;j++){

                 if (arrJobTypes[j]['value']==typeOfJob){
                    afterFilter.push(usersContractorResult[i])

                }
            }

        }

    }
    res.render('viewEmployeesEmployer',{data: afterFilter, typeOfJob})
}

module.exports.detailsOfContractorGet=async (req,res)=>{
    // const typeCon=req.params.typeOfJob
    const parm=req.params.id
    const attr = parm.split('+')
    // const idCon=req.params.id
    const typeCon=attr[0]
    const idCon=attr[1]
    var arrRecommendation = []

    Transaction.find({idContractor: idCon})
        .then(user=>{
            for(var i=0;i<user.length;++i){
                if(user[i].recommendation != '')
                    arrRecommendation.push(user[i].recommendation)
            }
            console.log(arrRecommendation[0])
            console.log(arrRecommendation[1])

            // console.log('here')
            // console.log(typeCon)
        }).catch(err=>{
        console.log(err)
    })
    UsersContractor.findById(idCon)
        .then(result => {
            // res.render('detailsOfContractor',  {result: result,typeOfJob:typeCon })
            res.render('detailsOfContractor',  {result: result,typeOfJob:typeCon,rec:arrRecommendation })
        })
        .catch(err => {
            console.log(err)
            res.render('404')
        })
}

module.exports.detailsOfContractorPost= (req,res)=> {

    //צריכה לוודא שהתאריך אינו באילוצים של העובד
    // ולוודא שהעובד לא מועסק עבור תאריך זה


    const {start, contractorId} = req.body
    console.log('cont')
    console.log(contractorId)

    console.log(start)
    var start1 = new Date(start)
    start1.setHours(0, 0, 0, 0)
    start1.setDate(start1.getDate() + 1)

    let end = new Date(start)
    end.setHours(23,59,59,999)

    console.log(start1)
    console.log(end)




    const token = req.cookies.jwt

    jwt.verify(token, 'sce secret', async (err, decodedToken) => {
        if (err) {
            console.log(err.message)
        } else {
            //console.log(decodedToken)
            const employerId = decodedToken.id
            console.log('emp')
            console.log(employerId)
            //check if the date is not a leave period of the contractor
            // console.log(contractorId.leaveDates)


            await UsersContractor.findById(contractorId)
                .then(con => {
                    if (!con.$isEmpty('leaveDates')) {
                        const leaveDatesCon = con.leaveDates
                        for (var j = 0; j < leaveDatesCon.length; j++) {
                            // if (leaveDatesCon[j].getTime()<=end.getTime() && leaveDatesCon[j].getTime()>=start1.getTime()  ){ // the date is leave dates
                            if (leaveDatesCon[j].getTime() == start1.getTime()) {
                                res.status(400).json({msgError: 'This contractor worker could not be recruited for the date you selected'})
                                return
                            }
                        }
                    } // the contractor worker could be hired
                    //need to check if he already has a job for this date

                    console.log('fd')
                    Transaction.findOne({
                        idContractor: contractorId,
                        date: start1
                        // {
                        // $gte: start1, $lte: end }
                    }).then(result => {
                        console.log(result)
                        if (result) { //already hired
                            res.status(400).json({msgError: 'This contractor worker could not be recruited for the date you selected'})
                            return
                        } else {//can hire
                            res.status(201).json({contractorId,start1,employerId})
                        }
                    }).catch(err=>console.log(err))


                })


        }
    })
}

module.exports.detailsOfContractorHoursPost=async  (req,res)=> {
//יכניס את השעות לבסיס נתונים
    const {contractorId,startDate,employerId, startMin, endMin,typeCon} = req.body
    console.log(startDate)
    UsersContractor.findById(contractorId)
        .then(async user=>{
            if(!user.$isEmpty('hourlyRate')) {
                var sal = user.hourlyRate
                console.log(sal)


                const newTrans = {
                    idContractor: contractorId,
                    idEmployer: employerId,
                    date: startDate,
                    jobType:typeCon,
                    hourlyRate: sal,
                    startHourRec: startMin,
                    endHourRec: endMin
                }
                // console.log(newTrans)
                try {
                    const tran = await Transaction.create(newTrans)
                    console.log(tran)
                    res.status(201).json({data: tran, msg: 'Recruitment was performed,\n wait till the contractor worker will approve it'})
                } catch (err) {
                    res.status(400).json({msgError: 'An error occurred'})
                }
            }
            else{
                res.status(400).json({msgError: 'An error occurred'})

            }

        }).catch(()=>{
        res.status(400).json({msgError: 'An error occurred'})

    })


}


module.exports.rateContractorPost= async (req,res)=>{

    const {idTransaction, rate,recommend} = req.body
    console.log(idTransaction)
    console.log(rate)

    await Transaction.updateOne({_id: idTransaction},
        {
            recommendation: recommend,
            rank: rate
        },).then(updatedRows => {
        console.log(updatedRows)
        res.status(201).json({updatedRows})
    }).catch(err => {
        res.status(400).json({msgError: 'an error occurred Try again'})
        console.log(err)

    })
    const cont=await Transaction.findById(idTransaction)
    console.log(cont)
    UsersContractor.calcAvg(cont.idContractor)



}

