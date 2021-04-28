const express = require('express')
const port    = process.env.PORT || 3000
const app     = express()

//connect to mongodb
const mongoose= require('mongoose')
//const Users=require('../models/users')


const cookieParser = require('cookie-parser')
// const { requireHRAuth, checkUser,requireEmpAuth } = require('../middleware/authMiddleware')
const {  checkUser } = require('../middleware/authMiddleware')


// middleware
//app.use(express.static('./views'))
app.use(express.static('./public'))

app.use(express.json())
app.use(cookieParser())

////////////////////////////////////
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
/////////////////////////

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
app.get('*', checkUser)

//homepage page
app.get('/', (req, res) => {
    res.render('home')
})

//ROUTES
const authRoutes= require('../routes/auth')
const employerRoutes= require('../routes/employer')
const HRRoutes= require('../routes/HR')
const ContractorRoutes= require('../routes/contractor')

app.use(authRoutes)
app.use(employerRoutes)
app.use(HRRoutes)
app.use(ContractorRoutes)







//success page
// app.get('/success', (req, res) => { ///need to change for thr HR home page and his stuff
//     res.render('success')
// })
// app.get('/success',requireHRAuth, (req, res) => { ///need to change for thr HR home page and his stuff
//     res.render('success')
// })






//for all the false routes
app.get('*', (req, res) => {
    res.render('404')
})
