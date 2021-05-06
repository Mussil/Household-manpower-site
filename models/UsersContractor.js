const mongoose=require('mongoose')
const {isEmail}=require('validator')
const bcrypt=require('bcrypt')
const addressSchema=require('./Address')
const bankSchema=require('./Bank')
const languagesSchema = require('./languageUser')
const jobsSchema = require('./JobType')

// const languagesArray = ['hebrew', 'english', 'arabic', 'russian', 'amharic', 'chinese','portuguese', 'french','romanian', 'polish', 'spanish']
// const jobsArray = ['babysitting',' ironing and washing', 'cleaning', 'gardening', 'cooking', 'pet care']
//
// const languagesSchema= new mongoose.Schema(
//     { value : {
//              type : String,
//             enum : languagesArray,
//             lowercase: true,
//
//         }
//     })
//
// const jobsSchema= new mongoose.Schema(
//     { value : {
//             type : String,
//             enum : jobsArray,
//             lowercase: true,
//
//         }
//     })


const userSchema= new mongoose.Schema({
    email: {
        type: String,
        required : [true,'Please enter an email'],
        unique : true,
        lowercase :true,
        trim:true,
        validate: [isEmail,'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true,'Please enter an password'],
        trim:true,
        minlength :[6,'Minimum password length is 6 characters'],
    },
    firstName: {
        type: String,
        required: [true,'Please enter first name'],
        trim:true,
        minlength :[3,'Minimum name length is 3 characters']
    },
    lastName: {
        type: String,
        required: [true,'Please enter last name'],
        trim:true,
        minlength :[3,'Minimum name length is 3 characters']
    },
    phoneNumber:{
        type: Number,
        min:100000000, //05X 1234567 אפס לא נחשב אז
        max:9999999999

    },
    address: {
        type: addressSchema.schema
    } ,
    bank: {
        type: bankSchema.schema
    },
    gender: {
        type: String,
        enum: ['male', 'female']
    },
    languages: {
        type: [languagesSchema.schema]
    },
    education: {
        type: String,
        lowercase: true,
        enum:['elementary', 'high school', 'higher']
    },
    smoker:{
        type: String,
        lowercase: true,
        enum: ['smoker' , 'non smoker' , 'not at work']
    },
    experience:{
        type: Number
    },
    hourlyRate:{
        type: Number,
        min:17,
        max:500,
        default:0
    },
    picture:{
        data: Buffer,
        contentType: String
    },
    form101:{
        data: Buffer,
        contentType: String
    },
    birthday:{
        type: Date,
        //required: true,
        trim: true,
    },
    aboutMe:{
        type: String,
        default: ''
    },
    jobTypes:{
        type: [jobsSchema],
    },
    leaveDates: {
        type: [Date],
        default: []
    },
    rating:{
        type:Number,
        min:0,
        max:5,
        default:0
    }


},{timestamp: true})


// fire a function before doc saved to db
userSchema.pre('save', async function (next) {
    console.log('here')
    if(this.isModified('password')){
        console.log('here2')
        const salt=await bcrypt.genSalt()
        this.password=await bcrypt.hash(this.password, salt)
        next()
    }
})



// static method to login user
userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({email})
    if (user) {
        const auth = await bcrypt.compare(password, user.password)
        if (auth) {
            return user
        }
        throw Error('incorrect password')
    }
    throw Error('incorrect email')
}

// static method to check email
userSchema.statics.checkEmail = async function(email) {
    const user = await this.findOne({email})
    if (user) {
            return user
    }
    throw Error('incorrect email')
}

const User = mongoose.model('userContractor', userSchema)
module.exports = User
