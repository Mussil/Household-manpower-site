const express = require('express')
const port    = process.env.PORT || 3000
const app     = express()

//var path = require('path')


//set up template engine
app.set('view engine', 'ejs')

//static files
app.use(express.static('./views'))




app.get('/', (req, res) => {
    //res.sendFile(path.join(__dirname + './public/404.html'))
    res.render('home')

})

app.get('/login', (req, res) => {
    //es.sendFile(path.join(__dirname + '/login.html'))
    res.render('login')

})
app.get('*', (req, res) => {
    //res.sendFile(path.join(__dirname + '/404.html'))
    res.render('404')
})



//listen to port
app.listen(port, ()=>{
    console.log(`server is up and running at: http://127.0.0.1:${port}`)
})