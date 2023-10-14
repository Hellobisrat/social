const router = require('express').Router();
const User = require('../models/User')
const bcrypt = require('bcrypt')

//get user
router.get('/', async(req,res)=>{
  const user =  await User.find()
  res.send(user)
})

// update user
router.put('/:id', async(req, res)=>{
  if(req.body.userId===req.params.id || req.params.isAdmin){
   
       try {
        const user = await User.findByIdAndUpdate(req.params.id,{
         $set: req.body
        })
        res.status(200).json('user updated')
      }catch(err){
        return res.status(500).json(err)
      }
      
} else {
    return res.status(403).json('you can not update')
}})

// delete user

router.delete('/:id', async(req,res)=>{
  if(req.body.userId===req.params.id || req.params.isAdmin){
   
    try {
     const user = await User.findByIdAndDelete(req.params.id)
     res.status(200).json('account has been deleted')
   }catch(err){
     return res.status(500).json(err)
   }
   
} else {
 return res.status(403).json('you can not delete')
}})

// get a user by id
router.get('/:id', async(req,res)=>{
  try {
    const user = await User.findById(req.params.id)
    
    res.status(200).json(user)

  } catch (error) {
    
    res.status(400).json(error)
  }
})

// adding friends
router.put('/:userId/friends/:friendId', async(req,res)=>{

    try {
      const user = await User.findById(req.params.userId)
      if(!user.friends.includes(req.body.userId)){
        await user.updateOne({$push:{friends:req.params.friendId}})
        
        
        res.status.json(user)
      }
      else{
        res.status(401).json('you already friend')
      }
    } catch (error) {
      res.status(500).json(error)
    }

  }

)
//remove friend 
router.put('/:userId/friends/:friendId', async(req,res)=>{
  if(req.body.userId !== req.params.id){
    try {
      const user = await User.findById(req.params.id)
      if(!user.friends.includes(req.params.userId)){
        await user.updateOne({$pull:{friends:req.params.friendId}})
        res.status.json(user)
      }
      else{
        res.status(401).json('you already unfriend')
      }
    } catch (error) {
      res.status(500).json(error)
    }

  }
  else{
    res.status(403).json('you can not unfriend yourself')
  }
})
module.exports = router