const router = require('express').Router();
const Post = require('../models/Post')




// get a post
router.get('/', async(req,res)=>{
  const post =  await Post.find()
  res.send(post)
})
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
    
    const post = await Post.findById(req.params.userId)
    console.log(post)
  
   const updatePost =  await post.updateOne({$set:req.body})
      res.status(200).json('the post has been updated')
   
    
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
 
 
})

// delete a post

//like a post

// get a post


// get timeline posts


module.exports = router