const router = require('express').Router();
const Thought = require('../models/Thought')
const User = require('../models/User')




// get a thought
router.get('/', async(req,res)=>{
  const thought =  await Thought.find()
  res.send(thought)
})


// get a thought by id

router.get('/:id', async(req, res)=>{
  try {
    const thought = await Thought.findById(req.params.id)
    res.status(200).json(thought)
  } catch (error) {
    res.status(500).json(error)
  }
 
})
// create a thought

router.post('/', async(req,res)=>{
 
  try {
    const newPost=   await Thought.create(req.body)
      const user = await User.findOneAndUpdate(
        {_id: req.body.userId},
        {$addToSet:{thoughts:newPost._id}},
         {new: true})

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

// create reaction
router.post('/:thoughtId/reactions', async(req,res)=>{
  try {

    const thought = await Thought.findOneAndUpdate(
     { _id: req.params.thoughtId },
     { $addToSet: { reactions: req.body } },
     { new: true }
    );
  
    if (!thought) {
     return res.status(404).json({ message: 'No thought with this id!' });
    }} catch (error) {
      console.log(error)
      res.status(500).json(error)
     }
  // const thought =  await Thought.findOneAndUpdate({_id:req.params.thoughtId},
  //                              {$push:{reactions:req.body}})
  //       res.status(200).json(thought)
})


// delete reaction
router.delete('/:thoughtId/reactions/:id', async(req,res)=>{
  const thought =  await Thought.findOneAndUpdate({_id:req.params.thoughtId},
                               {$pull:{reactions:{reactionId:req.params.id}}})
        res.status(200).json(thought)
})

module.exports = router