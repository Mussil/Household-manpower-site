
module.exports= function(app,db) {
    const bodyParser = require('body-parser')
    app.use(bodyParser.urlencoded({extended: true}))


    app.get('/signup', (req, res) => {
        res.render('signup')
    })

    app.post('/signup', (req, res) => {
        let user={userName: req.body.userName,
            password:req.body.password,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email
        }
        db.push(user)
        console.log('new user has been added')
        res.render('home')

        console.log(db)

    })

}