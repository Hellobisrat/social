const {Schema,Model, model}= require('mongoose')

const PostSchema = new Schema ({

  
    userId: {
      type:String,
      require: true
    },
    desc: {
      type:String,
      max:500
      
    },
    img: {
      type:String
    },
    likes:{
      type:Array,
      default:[]
    }
  },
    {timestamps:true}

  );






const Post = model('Post', PostSchema);

model.exports = Post;