const express = require('express')
const port    = process.env.PORT || 3000
const app     = express()


const path    = require('path')

console.log(process.env.PORT)
app.get('/', (req, res) => {
    //res.send('hello world')
    res.sendFile(path.join(__dirname, 'index.html'))

})


// app.get('/profile', (req, res) => {
//     res.send('welcome to profile page')
// })

app.listen(port, ()=>{
    console.log(`server is up and running at: http://127.0.0.1:${port}`)
})