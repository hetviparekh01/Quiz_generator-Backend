import express from "express"
import config from "config"
import { connectDB } from "./src/db/connect";;
import Route from "./src/routes";
import cors from 'cors'
const app=express()
app.use(cors())
app.use(express.json())
app.use('/api',Route)

const port=config.get("port") || 8000;
connectDB()
.then(()=>{
    app.listen(port,()=>{
        console.log("DB Connected !!");
        console.log(`server running on port ${port}`);
    })
})
.catch(()=>{
    console.log("Error in connecting Database!!");
})