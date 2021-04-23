const mongoose=require('mongoose')
const {isEmail}=require('validator')
const bcrypt=require('bcrypt')

const userSchema= new mongoose.Schema({
    email: {
        type: String,
        required : [true,'Please enter an email'],
        unique : true,
        trim:true,
        lowercase :true,
        validate: [isEmail,'Please enter a valid email'],

    },
    password: {
        type: String,
        required: [true,'Please enter an password'],
        trim:true,
        minlength :[6,'Minimum password length is 6 characters'],
    }

},{timestamp: true})




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


    const User = mongoose.model('userHR', userSchema)
    module.exports = User
