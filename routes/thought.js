const router = require('express').Router();
const Thought = require('../models/Thought')
const User = require('../models/User')




// get a thought
router.get('/', async(req,res)=>{
  const thought =  await Thought.find()
  res.send(post)
})
// create a thought

router.post('/', async(req,res)=>{
 
  try {
    const newPost=   await Thought.create(req.body)
    const currentUser = await User.findById(req.body.userId)
    await currentUser.updateOne({$push:{ thoughts:newPost._id}})
    res.status(200).json(newPost)
    
  } catch (error) {
    res.status(500).json(error)
  }
})

//update a thought

router.put('/:id', async(req,res) =>{
  try {
    
    const post = await Thought.findById(req.params.id)

   const updatedThought =  await Thought.updateOne({$set:req.body})
      res.status(200).json(updatedThought)
   
    
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
 
 
})

// delete a thought

router.delete('/:id', async(req,res) =>{
  try {
    
    const thought = await Thought.findOneAndRemove({_id:req.params.id})
    await User.findOneAndUpdate({thoughts:  req.params.id},{$pull:{thoughts:req.params.id}})
     res.status(200).json(thought)
   
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
 
 
})


router.post('/:thoughtId/reactions', async(req,res)=>{
  const thought =  await Thought.findOneAndUpdate({_id:req.params.thoughtId},
                               {$push:{reactions:req.body}})
        res.status(200).json(thought)
})

router.delete('/:thoughtId/reactions/:id', async(req,res)=>{
  const thought =  await Thought.findOneAndUpdate({_id:req.params.thoughtId},
                               {$pull:{reactions:{reactionId:req.params.id}}})
        res.status(200).json(thought)
})

module.exports = router