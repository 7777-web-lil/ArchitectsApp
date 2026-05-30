import * as dotenv from "dotenv";
import app from "./app";
import { connectDB } from "./config/db";

dotenv.config();
connectDB();

app.listen(3000,()=>{
    console.log("port 3000 is listening")
})