
require("dotenv").config();
const express=require('express')
const bodyparser=require('body-parser')
const cors=require('cors')
const router = require('./routes/route')
const mongoose=require('mongoose')

const app=express()

app.use(cors())
app.use(bodyparser.json())

const port=8000
app.use('/',router)


 //inserting users in  models/mongoose.js file

let dbname="register"
let URL=`mongodb+srv://sreekanth:mJAbpJRJk3WqzCAX@cluster0.4pr0n.mongodb.net/${dbname}`

mongoose.connect(URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

 const db=mongoose.connection

 db.on('error',console.error.bind(console,'Connection error'))
 
 db.once('open',()=>{
    console.log('connected successfully')
 })
 //inserting users in  models/mongoose.js file
 
app.listen(process.env.PORT||port,()=>{
    console.log('server is running on port',port)
})
