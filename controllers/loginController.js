//const mongoose= require('mongoose')
const Users=require('../models/users')


module.exports= function(app){
    const bodyParser = require('body-parser')
    app.use(bodyParser.urlencoded({ extended: true }))

    app.get('/login', (req, res) => {
        res.render('login')
    })


    app.post('/login', (req, res) => {
        console.log('Username: ' + req.body.email)
        console.log('Password: ' + req.body.password)

        Users.findOne({email:req.body.email , password:req.body.password},function(err,result){
            if(err){//err
                            console.log(err)
            }
            if(result){// Success!
                            console.log(result)
                            res.render('success')
            }
            else{
                            console.log('user does not exist')//צריך להציג לו משהו
                            res.render('login')
            }
        })



        })

}


