const express = require("express")
require('dotenv').config()
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser:true})
const db = mongoose.connection
db.on('error', (error)=> {
    console.log(error)
})
db.once('open', ()=>{
    console.log('connected to Database')
})



app.listen(3000, ()=>{
    console.log("Server is running on port 3000")
})