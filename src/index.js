const express = require('express')
const port    = process.env.PORT || 3000
const app     = express()

//connect to mongodb
const mongoose= require('mongoose')
//const Users=require('../models/users')

const dbURI= 'mongodb+srv://user:user@cluster0.p5zoq.mongodb.net/project-db?retryWrites=true&w=majority'
mongoose.connect(dbURI, {useNewUrlParser: true , useUnifiedTopology: true})
    .then(()=>//listen to port
        app.listen(port, ()=>{
            console.log(`server is up and running at: http://127.0.0.1:${port}`)
        }))
    .catch((err)=>console.log(err))

//controllers
var loginController=require('../controllers/loginController')
var signupController=require('../controllers/signupController')


//set up template engine
app.set('view engine', 'ejs')

//static files
app.use(express.static('./views'))

//fire controllers
loginController(app)
signupController(app)

//homepage page
app.get('/', (req, res) => {
    //res.sendFile(path.join(__dirname + './public/404.html'))
    res.render('home')

})




//success page
app.get('/success', (req, res) => {
    res.render('success')
})




//for all the false routes
app.get('*', (req, res) => {
    //res.sendFile(path.join(__dirname + '/404.html'))
    res.render('404')
})


// //listen to port
// app.listen(port, ()=>{
//     console.log(`server is up and running at: http://127.0.0.1:${port}`)
// })