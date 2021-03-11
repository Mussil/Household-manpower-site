const express = require('express')
const port    = process.env.PORT || 3000
const app     = express()

var loginController=require('../controllers/loginController')
//var signupController=require('../controllers/signupController')

var db=[{userName: 'mussi', password:'123456', phoneNumber: '0546785672', email: 'mussi@gmail.com'},
    {userName: 'M', password:'87654', phoneNumber: '0546463672', email: 'mui@gmail.com'}
]


//set up template engine
app.set('view engine', 'ejs')

//static files
app.use(express.static('./views'))

//fire controllers
loginController(app,db)
//signupController(app)

//homepage page
app.get('/', (req, res) => {
    //res.sendFile(path.join(__dirname + './public/404.html'))
    res.render('home')

})


// //login page
// app.get('/login', (req, res) => {
//     res.render('login')
// })
//
// app.post('/login', (req, res) => {
//     console.log('Username: ' + req.body.username)
//     console.log('Password: ' + req.body.password)
//     res.render('home')
// })

//signup page
app.get('/signup', (req, res) => {
    res.render('signup')

})


//success page
app.get('/success', (req, res) => {
    res.render('success')
})

app.get('*', (req, res) => {
    //res.sendFile(path.join(__dirname + '/404.html'))
    res.render('404')
})



//listen to port
app.listen(port, ()=>{
    console.log(`server is up and running at: http://127.0.0.1:${port}`)
})