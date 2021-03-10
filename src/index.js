const express = require('express')
const port    = process.env.PORT || 3000
const app     = express()

const path    = require('path')

//set up template engine
app.set('view engine', 'ejs');

//static files
app.use(express.static('./'));



app.get('/', (req, res) => {
    //res.send('hello world')
    res.sendFile(path.join(__dirname, 'index.html'))

})


//listen to port
app.listen(port, ()=>{
    console.log(`server is up and running at: http://127.0.0.1:${port}`)
})