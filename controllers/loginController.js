


module.exports= function(app,db){
    const bodyParser = require('body-parser')
    app.use(bodyParser.urlencoded({ extended: true }))

    app.get('/login', (req, res) => {
        res.render('login')
    })

    app.post('/login', (req, res) => {
        console.log('Username: ' + req.body.username)
        console.log('Password: ' + req.body.password)
        var i
        for (i = 0; i < db.length; i++) {
            if(db[i].userName==req.body.username && db[i].password==req.body.password ){
                console.log('exists')
                res.render('success')
            }
        }
        //למקרה שהיוזר לא קיים צריך להוסיף התראה ולהציע לו להרשם ולא להפעיל את הדף מחדש
        console.log('user does not exist')
        res.render('login')
    })


}


