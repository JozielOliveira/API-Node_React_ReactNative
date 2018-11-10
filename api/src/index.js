const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParse = require('body-parser')

const app = express()

const server = require('http').Server(app)
const io = require('socket.io')(server)

mongoose.connect('mongodb://root:12345@ds155833.mlab.com:55833/tweeter-db',{
    useNewUrlParser: true
})

app.use(cors())
app.use(bodyParse.json())
app.use(bodyParse.urlencoded({extended : true}))

app.use((req, res, next) => {
    req.io = io
    return next()
})

app.use(require('./routes'))


server.listen(3000, () => {
    console.log('Server linsten port 3000')
})