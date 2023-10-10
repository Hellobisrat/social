const router = require('express').Router();
const Post = require('../models/Post')



// create a post

router.post('/', async(req,res)=>{
 
  try {
    const newPost=   await Post.create(req.body)
    
    res.status(200).json(newPost)
    
  } catch (error) {
    res.status(500).json(error)
  }
})

//update a post

router.put('/:id', async(req,res) =>{
  try {
    
    const post = await Post.findById(req.params.id)
    if(post.userId === req.body.userId){
   const updatePost =  await post.updateOne({$set:req.body})
      res.status(200).json('the post has been updated')
    }
    else {
      res.status(403).json('you can update only your own post')
    }
   
    
  } catch (error) {
    res.status(500).json(error)
  }
 
 
})

// delete a post

//like a post

// get a post


// get timeline posts


module.exports = router