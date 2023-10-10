const router = require('express').Router();
const User = require('../models/User')
const bcrypt = require('bcrypt')

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

// get a user
router.get('/:id', async(req,res)=>{
  try {
    const user = await User.findById(req.params.id)
    const {password,updatedAt, ...other} =user._doc
    res.status(200).json(other)

  } catch (error) {
    
    res.status(400).json(error)
  }
})

// follow a user 
router.put('/:id/follow', async(req,res)=>{
  if(req.body.userId !== req.params.id){
    try {
      const user = await User.findById(req.params.id)
      const currentUser = await User.findById(req.body.userId)
      if(!user.followers.includes(req.body.userId)){
        await user.updateOne({$push:{followers:req.body.userId}})
        await currentUser.updateOne({$push:{following: req.body.params.id}})
        res.status.json('user has been followed')
      }
      else{
        res.status(401).json('you already follow')
      }
    } catch (error) {
      res.status(500).json(error)
    }

  }
  else{
    res.status(403).json('you can not follow yourself')
  }
})
//unfollow users
router.put('/:id/unfollow', async(req,res)=>{
  if(req.body.userId !== req.params.id){
    try {
      const user = await User.findById(req.params.id)
      const currentUser = await User.findById(req.body.userId)
      if(!user.followers.includes(req.body.userId)){
        await user.updateOne({$pull:{followers:req.body.userId}})
        await currentUser.updateOne({$pull:{following: req.body.params.id}})
        res.status.json('user has been unfollowed')
      }
      else{
        res.status(401).json('you already unfollow')
      }
    } catch (error) {
      res.status(500).json(error)
    }

  }
  else{
    res.status(403).json('you can not unfollow yourself')
  }
})
module.exports = router