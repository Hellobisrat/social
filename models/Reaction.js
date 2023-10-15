const mongoose = require("mongoose");

const ReactionSchema = new mongoose.Schema({
  reactionId:{
    type: mongoose.Schema.Types.ObjectId,
   
    default: () => new mongoose.Types.ObjectId(),
  },
  reactionBody:{
    type:String,
    require:true,
    max:280
  },
  username:{
    type:String,
    require:true
  },
  createdAt:{
    type:Date,
    timeStamp:true

  }
})



module.exports = ReactionSchema ;