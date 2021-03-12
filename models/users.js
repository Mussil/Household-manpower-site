const mongoos=require('mongoose')
const Schema = mongoos.Schema

const usersSchema =new Schema({
    email: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    optional1:{
        type: String,
        required: false
    },
    optional2:{
        type: String,
        required: false
    }

}, {timestamp: true})

const Users = mongoos.model('Users', usersSchema)

module.exports=Users

