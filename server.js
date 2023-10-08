
const express = require('express');
const app = express();
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const morgan = require('morgan')
const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")

const db =('../connection/connection.js')
dotenv.config()


app.use(express.json());
app.use(morgan('common'))
app.use('/api/user',userRoute)
app.use('/api/auth',authRoute)

app.get("/",(req,res)=>{
 res.send('welcome to home page')
})

app.get("/users",(req,res)=>{
  res.send('welcome to users page')
 })
app.listen(3004,()=>{
  console.log('Back server is running')
})