const router = require('express').Router();
const User = require('../models/User')
const bcrypt = require('bcrypt')

//get user
router.get('/', async(req,res)=>{
  const user =  await User.find()
  res.status(200).json(user)
})

// create user

router.post('/',async(req,res)=>{
  try {
    const user = await User.create(req.body)
    res.status(200).json(user)   
  } catch (error) {
    
  }
  
})

// update user
router.put('/:id', async(req, res)=>{
  
       try {
        const user = await User.findByIdAndUpdate(req.params.id,{
         $set: req.body
        },
        {new:true})
        res.status(200).json(user)
      }catch(err){
        return res.status(500).json(err)
      }
      
})

// delete user

router.delete('/:id', async(req,res)=>{
 
    try {
     const user = await User.findByIdAndDelete(req.params.id)
     res.status(200).json('account has been deleted')
   }catch(err){
     return res.status(500).json(err)
   }
   
})

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
router.post('/:userId/friends/:friendId', async(req,res)=>{

    try {
     
      const user = await User.findOneAndUpdate(
        {_id: req.params.userId},
        {$addToSet:{friends:req.params.friendId}},
         {new: true})

      res.status(200).json(user)
    } catch (error) {
      res.status(500).json(error)
    }

  }

)
//remove friend 
router.delete('/:userId/friends/:friendId', async(req,res)=>{

    try {
     
      
         const user =  await User.findOneAndUpdate({_id:req.params.userId},
          {$pull:{friends:{friendId:req.params.friendId}}},
          {new:true})
         res.status(200).json(user)
      
      }
      
     catch (error) {
      res.status(500).json(error)
    }
    

  }
  
)
module.exports = router