const express = require('express')
const port    = process.env.PORT || 3000
const app     = express()

//connect to mongodb
const mongoose= require('mongoose')
//const Users=require('../models/users')
const authRoutes= require('../routes/auth')
const cookieParser = require('cookie-parser')
const { requireAuth } = require('../middleware/authMiddleware')


// middleware
app.use(express.static('./views'))
app.use(express.json())
app.use(cookieParser())


//set up template engine
app.set('view engine', 'ejs')


//database connection
const dbURI= 'mongodb+srv://user:user@cluster0.p5zoq.mongodb.net/project-db?retryWrites=true&w=majority'
mongoose.connect(dbURI, {useNewUrlParser: true , useUnifiedTopology: true})
    .then(()=>//listen to port
        app.listen(port, ()=>{
            console.log(`server is up and running at: http://127.0.0.1:${port}`)
        }))
    .catch((err)=>console.log(err))



//routes

//homepage page
app.get('/', (req, res) => {
    res.render('home')
})

app.use(authRoutes)



//controllers
//var loginHRController=require('../controllers/loginHRController')
// var loginController=require('../controllers/loginController')
// var signupController=require('../controllers/signupController')



//fire controllers
//loginHRController(app)
// loginController(app)
// signupController(app)






//success page
app.get('/success',requireAuth, (req, res) => { ///need to change for thr HR home page and his stuff
    res.render('success')
})






//for all the false routes
app.get('*', (req, res) => {
    res.render('404')
})
