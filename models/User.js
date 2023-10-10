const { timeStamp } = require('console');

const { Schema, model } = require('mongoose');


const UserSchema  = new Schema({

  username:{
    type:String,
    require:true,
    max:20,
    unique:true
  },
  email:{
    type:String,
    required:true,
    max:50,
    unique:true
  },
  password:{
    type:String,
    require:true,
    min:6
  },
  profilePicture:{
    type:String,
    default:""
  },
  coverPicture:{
    type:String,
    default:""
  },
  followers:{
    type:Array,
    default:[]
  },
  following:{
    type:Array,
    default:[]
  },
  isAdmin:{
    type:Boolean,
    default:false
  },
  description:{
    type:String,
    max:50
  },
  city:{
    type:String,
    max:50
  },
  from:{
    type:String,
    max:50
  },
  relationship:{
    type:Number,
    enum:[1,2,3]
  }


},
{timestamps:true}
);

const User = model('User', UserSchema);

module.exports = User;


