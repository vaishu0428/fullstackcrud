const express=require("express")
const userRouter=express.Router()
const {UserModel}=require("../model/User.model")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
userRouter.post("/register",async(req,res)=>
{
  const {name,email,pass}=req.body
  try{
    bcrypt.hash(pass,5,async(err,hash)=>
    {
        if(err)
        {
            res.send({"msg":"Something went wrong","err":err.messsage}) 
        }
        else{
            const user=new UserModel({name,email,pass:hash})
            await user.save()
            res.send({"msg":"New User Has been registered"})
        }
    })
    
  }
  catch(err)
  {
    res.send("Something went to wrog")
  }
})
userRouter.post("/login",async(req,res)=>
{
    const {email,pass}=req.body

    try{
      const user=await UserModel.find({email})
      if(user.length>0)
      {
        bcrypt.compare(pass,user[0].pass,(err,result)=>
        {
            if(result)
            {
                let token=jwt.sign({userID:user[0]._id},'masai')
                res.send({"msg":"Logged in","token":token})
            }
            else{
                res.send("Something went wrong")
            }
        })
       
      }
      else{
        res.send("Wrong Credentials")
      }
    }
    catch(err)
    {
        res.send("Something went to wrog")
    }

})
module.exports={userRouter}