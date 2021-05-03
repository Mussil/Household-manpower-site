const mongoose=require('mongoose')
// const UsersContractor=require('./UsersContractor')
// const UsersEmployer=require('./UsersEmployer')
const jobsArray = ['babysitting',' ironing and washing', 'cleaning', 'gardening', 'cooking', 'pet care']


let transactionSchema = new mongoose.Schema({

    idContractor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userContractor',
        required: true
    },
    idEmployer : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userEmployer',
        required: true
    },
    date:{
        type: Date,
        min: '2000-01-01',
        max: '2050-12-30',
        required: true,
        default: Date.now
    },
    jobType:{
        type: String,
        lowercase: true,
        enum: jobsArray
    },
    rank:{
        type: 'Number',
        min:0,
        max:5,
        default:0
    },
    hourlyRate:{
        type: 'Number',
        min:17,
        max:500,
        default:17,
        required: true
    },
    startHourRec:{
        type: Number,
        min:0,
        max:1440 ,//number of minutes in a day,
        required:true
    },
    endHourRec:{
        type: Number,
        min:0,
        max:1440 ,//number of minutes in a day,
        required:true,
        validate: [
            function (value) {
                return this.startHourRec <= value
            }
        ]
    },
    startHourShift:{
        type: Number,
        min:0,
        max:1440 ,//number of minutes in a day,
    },
    endHourShift:{
        type: Number,
        min:0,
        max:1440 ,//number of minutes in a day,
        validate: [
            function (value) {
                return this.startHourShift <= value
            }
        ]
    },
    recommendation: {
        type: [String],
        default: []
    },
    isShifted:{
        type:Boolean,
        default:false
    }




},{timestamp: true})

transactionSchema=mongoose.model('usersTransaction',transactionSchema  )
module.exports = transactionSchema
