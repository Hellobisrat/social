
const mongoose = require('mongoose')
const { Schema, model } = require('mongoose');


const UserSchema  = new mongoose.Schema({

  username:{
    type:String,
    require:true,
    trimmed:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  
  thoughts:{
    type:Array,
    default:[]
  },
  friends:{
    type:Array,
    default:[]
  }


},
{timestamps:true}
);

const User = model('User', UserSchema);

module.exports = User;


