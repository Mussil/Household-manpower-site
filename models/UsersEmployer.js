const mongoose=require('mongoose')
const {isEmail}=require('validator')
const bcrypt=require('bcrypt')
const addressSchema=require('./Address')

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
        minlength :[3,'Minimum name length is 4 characters']
    },
    lastName: {
        type: String,
        required: [true,'Please enter last name'],
        trim:true,
        minlength :[3,'Minimum name length is 4 characters']
    },
    phoneNumber:{
        type: Number,
        min:1000000000,
        max:9999999999

    },
    address: {
        type: addressSchema.schema
    }


})




// fire a function before doc saved to db
userSchema.pre('save', async function (next) {
    const salt=await bcrypt.genSalt()
    this.password=await bcrypt.hash(this.password, salt)
    next()
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


const User = mongoose.model('userEmployer', userSchema)
module.exports = User
