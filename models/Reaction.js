const mongoose = require('mongoose')

const ReactionSchema = new mongoose.Schema ({
  reactionId:{
    Type:String,
    default: new ObjectId
  },
  reactionBody:{
    Type:String,
    require:true,
    max:280
  },
  username:{
    Type:String,
    require:true
  },
  createdAt:{
    Type:Date,
    timeStamp:true

  }
})



module.exports = ReactionSchema ;