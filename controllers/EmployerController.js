// controller actions
const UsersContractor=require('../models/UsersContractor')
const Transaction=require('../models/Transaction')
const usersEmp = require('../models/UsersEmployer')
//const addressModel = require('../models/Address')
const jwt = require('jsonwebtoken')

module.exports.homepageEmployerGet=(req,res)=>{
    res.render('homepageEmployer')
}
///////////////////////////////////!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
module.exports.workHistoryEmployerGet=(req,res)=>{
    res.render('workHistoryEmployer')
}

module.exports.profileEmployerDetailsGet=(req,res)=>{
    res.render('profileEmployerDetails')
}

module.exports.profileEmployerGet=(req,res)=>{
    res.render('profileEmployer')

}

module.exports.profileEmployerPost = async (req,res)=> {

    // const {email, password, firstName, lastName, phoneNumber, city, street, houseNumber} = req.body
    const token = req.cookies.jwt
    if (token) {
        jwt.verify(token, 'sce secret', async (err, decodedToken) => {
                if (err) {
                    console.log(err)
                } else {
                    usersEmp.findOneAndRemove({_id: decodedToken.id}).then(user =>{
                        if(user)
                            res.send('user?')
                        else res.render('/')
                    })
                }
        })
    }
}



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

    console.log('here')
    // console.log(typeCon)
    UsersContractor.findById(idCon)
        .then(result => {
            res.render('detailsOfContractor',  {result: result,typeOfJob:typeCon })
        })
        .catch(err => {
            console.log(err)
            res.render('404')
        })

}






module.exports.detailsOfContractorPost= (req,res)=> {

    //mצריכה לוודא שהתאריך אינו באילוצים של העובד
    // ולוודא שהעובד לא מועסק עבור תאריך זה


    const {start, contractorId} = req.body
    console.log('cont')
    console.log(contractorId)


    var start1 = new Date(start)
    start1.setHours(0, 0, 0, 0)
    start1.setDate(start1.getDate() + 1)

    let end = new Date(start)
    end.setHours(23,59,59,999)

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
                            }
                        }
                    } // the contractor worker could be hired
                        //need to check if he already has a job for this date
                        Transaction.findOne({
                            idContractor: contractorId,
                            date: {
                                $gte: start1, $lte: end }
                        }).then(result => {
                            console.log(result)
                            if (result) { //already hired
                                res.status(400).json({msgError: 'This contractor worker could not be recruited for the date you selected'})
                            } else {//can hire
                                res.status(201).json({contractorId,start1,employerId})
                            }
                        })


                })


        }
    })
}




module.exports.detailsOfContractorHoursPost=async  (req,res)=> {
//יכניס את השעות לבסיס נתונים
    const {contractorId,startDate,employerId, startMin, endMin,typeCon} = req.body
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
            console.log(newTrans)
            try {
                const tran = await Transaction.create(newTrans)
                console.log(tran)
                res.status(201).json({data: tran, msg: 'Recruitment was performed'})
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