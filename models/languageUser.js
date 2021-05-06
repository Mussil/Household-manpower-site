const mongoose=require('mongoose')

const languagesArray = ['hebrew', 'english', 'arabic', 'russian', 'amharic', 'chinese','portuguese', 'french','romanian', 'polish', 'spanish']

var languagesSchema= new mongoose.Schema({

    value : {
        type : String,
        enum : languagesArray,
        lowercase: true
    }
    })


languagesSchema = mongoose.model('languages',languagesSchema,'language')
module.exports = languagesSchema
