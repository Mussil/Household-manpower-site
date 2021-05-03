const mongoose=require('mongoose')


// address model
let bankSchema = new mongoose.Schema({
    branch: {
        type: Number
    },
    accountNumber: {
        type: Number,
        min:100000,
        max:999999
    },
    bankName: {
        type: String
    }
})
bankSchema=mongoose.model('bank',bankSchema ,'bank' )
module.exports = bankSchema
