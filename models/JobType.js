const mongoose=require('mongoose')

const jobsArray = ['babysitting','ironing', 'cleaning', 'gardening', 'cooking', 'pet care']


const jobsSchema= new mongoose.Schema(
    { value : {
            type : String,
            enum : jobsArray,
            lowercase: true,

        }
    })

const jobsType = mongoose.model('jobType', jobsSchema)
module.exports = jobsType
