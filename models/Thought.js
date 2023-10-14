const mongoose = require('mongoose');
const ReactionSchema = require('./Reaction')

const ThoughtSchema = new mongoose.Schema ({

  
  thoughtText: {
      type:String,
      require: true,
      min:8,
      max:258
    },
    createdAt: {
      type:Date,
      default:Date.now
      
    },
    username: {
      type:String,
      require:true
    },
    reactions:[ReactionSchema]
  },
  {
    
    toJSON: {
      virtuals: true,
    },
    id: false,
  }

  );
 ThoughtSchema
  .virtual('reactionCount')
  .get(function () {
    return this.reactions.length
  })






const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;