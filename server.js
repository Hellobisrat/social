
const express = require('express');
const app = express();
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const morgan = require('morgan')
const userRoute = require("./routes/users")
const thoughtRoute = require("./routes/thought")

const db =require('./config/connection')



app.use(express.json());

app.use('/api/user',userRoute)
app.use('/api/thought',thoughtRoute)



 db.once('open',()=>{app.listen(3004,()=>{
  console.log('Back server is running')
})})


