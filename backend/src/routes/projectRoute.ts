import express, {Request, Response} from "express";
import Project from "../models/project";

const router= express.Router()

router.get("/",async (req:Request,res:Response)=>{
    const project= await Project.find()
    res.json(project)
})

router.post("/", async (req:Request,res:Response)=>{
    try{
        const project= await Project.create(req.body)
        res.status(201).json(project)
    }
    catch (error){
        res.status(500).json({
            message :"There was an error creating the project"
        })

    }

})
router.put("/:id", async (req:Request,res:Response)=>{
    const{id}=req.params
    try{
        const updateProject= await Project.findByIdAndUpdate(id,
            req.body,
            { returnDocument: "after" }

        )
        res.status(201).json(updateProject)
    }catch(error){
        res.status(500).json({
            message:"There was an error updating your project"
        })
    }
})
export default router