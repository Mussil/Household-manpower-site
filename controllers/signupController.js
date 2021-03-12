const bodyParser = require('body-parser')
//const mongoose= require('mongoose')
const Users=require('../models/users')

module.exports= function(app) {
    app.use(bodyParser.urlencoded({extended: true}))


    app.get('/signup', (req, res) => {
        res.render('signup')
    })

    app.post('/signup', (req, res) => {
        let user1= new Users({
            email: req.body.email,
            password: req.body.password,
            optional1: req.body.userName,
            optional2: req.body.phoneNumber

        })
        user1.save()
            .then(()=>{
                console.log('new user has been added')
                res.render('home')
            })
            .catch((err)=>{
                console.log(err)
            })


    })

}

