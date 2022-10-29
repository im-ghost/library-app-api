const jwt = require('jsonwebtoken')
const User = require('../models/user.js')

const ensureAuth =async (fn,args,token) =>{
  if(token){
  const decoded = jwt.verify(token, "secret ")
      const user = await User.findById(decoded.id).select('-password')
       if(user){
       if(args){
         return fn(...args)
       } 
       else{
         return fn()
       }
         
       }
       else{
         throw new Error("Not authorized ")
       }
  }else{
    throw new Error("No token")
  }
}/*
*/
module.exports = ensureAuth
