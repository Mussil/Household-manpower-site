const mongoose=require('mongoose')


// address model
var addressSchema = new mongoose.Schema({
    city: {
        type: String
    },
    street: {
        type: String
    },
    houseNumber: {
        type: String
    }
})
addressSchema=mongoose.model('address',addressSchema ,'address' )
module.exports = addressSchema
