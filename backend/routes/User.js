const express=require('express')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const app=express.Router()
const zod=require('zod')
const {JWT_SECRET}=require('../config')
const {User,Room}=require('../db')

const signupbody=zod.object({
    username:zod.string().min(3).max(20),
    email:zod.string().email(),
    password:zod.string().min(6).max(20)
})

const signinbody=zod.object({
    email:zod.string().email(),
    password:zod.string().min(6).max(20)
})

app.post("/signup", async (req,res)=>{
    const success=signupbody.safeParse(req.body);
    if(!success.success){
        return res.status(400).send(success.error.errors)
    }
    const {username,email,password}=req.body;
    const existing_user= await User.findOne({
        username:username
    })
    if(existing_user){
        return res.status(400).send("Username already exists")
    }
    const hashedPassword=await bcrypt.hash(password,10)//Hashing password
    const user=await User.create({
        username:username,
        email:email,
        password:hashedPassword
    })
    const userid=user._id;
    const token=jwt.sign({
        userId:userid
    },JWT_SECRET)
    res.json({
        message:"User Created",
        token:token,
        username:user.username
    })
})


app.post("/signin", async (req,res)=>{
    const success=signinbody.safeParse(req.body);
    if(!success.success){
        return res.status(400).send(success.error.errors)
    }
    
    const {email,password}=req.body;
    const user=await User.findOne({
        email:email,
    })
    if(!user){
        return res.status(400).send("User not found")
    }
    const isPasswordValid=await bcrypt.compare(password,user.password)
    if(!isPasswordValid){
        return res.status(400).send("Invalid Password")
    }
    const token=jwt.sign({
        userId:user._id
    },JWT_SECRET)
    res.json({
        message:"User Logged In",
        token:token,
        username:user.username
    })
})



module.exports=app
