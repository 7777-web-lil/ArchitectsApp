import express, { Request, Response } from "express";
import projectRoute from "./routes/projectRoute";
import cors from "cors";



const app= express()
app.use(cors());
app.use(express.json())
app.use("/projects",projectRoute)



// app.get('/dog',(req:Request,res:Response)=>{
//     res.send("Api is running")
// })
export default app