import express from "express";
import env from 'dotenv'


env.config();
const app=express()

app.get('/',(req,res)=>{
    res.json({message:'hello from server'})
})




const PORT= 8000 || +process.env.PORT 

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
})




