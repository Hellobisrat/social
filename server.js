
const express = require('express');
const app = express();
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const morgan = require('morgan')
const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const postRoute = require("./routes/post")

const db =require('./config/connection')



app.use(express.json());
app.use(morgan('common'))
app.use('/api/user',userRoute)
app.use('/api/auth',authRoute)
app.use('/api/post',postRoute)

app.get("/",(req,res)=>{
 res.send('welcome to home page')
})

app.get("/users",(req,res)=>{
  res.send('welcome to users page')
 })

 db.once('open',()=>{app.listen(3004,()=>{
  console.log('Back server is running')
})})


