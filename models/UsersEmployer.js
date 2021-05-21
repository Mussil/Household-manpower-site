const mongoose=require('mongoose')
const {isEmail}=require('validator')
const bcrypt=require('bcrypt')
const addressModel=require('./Address')

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
        minlength :[6,'Minimum password length is 6 characters']
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
        type: addressModel.schema
    }


},{timestamp: true})


// fire a function before doc saved to db
userSchema.pre('save', async function (next) {
    console.log('here11')
    if(this.isModified('password')){
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

const User = mongoose.model('userEmployer', userSchema)
module.exports = User

