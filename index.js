import express from "express";
import env from 'dotenv'
import cors from 'cors'
import Connection from "./db/db.js";
import authRoute from './route/auth.route.js'
import cookieParser from "cookie-parser";



env.config();
const app=express()
app.use(express.json())


app.use(cors({ credentials: true, origin: "https://airbnb-29671.web.app" }));
app.use(cookieParser());


app.use('/api',authRoute)

   

app.use((err, req, res, next) => {
    console.log("global");
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(status).json({
      success: false,
      message,
      status,
    });
  });

  
const PORT = process.env.PORT || 8000;

const URL=process.env.DATABASE
Connection(URL)


app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
})




