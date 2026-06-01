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
        const updatedProject= await Project.findByIdAndUpdate(id,
            req.body,
            { returnDocument: "after" }

        )
        res.status(201).json(updatedProject)
    }catch(error){
        res.status(500).json({
            message:"There was an error updating your project"
        })
    }
})
router.delete("/:id",async (req:Request,res:Response)=>{
    const{id}=req.params
    try{
        const deletedProject= await Project.findByIdAndDelete(id)
        res.status(201).json(deletedProject)
    }catch (error){
        res.status(500).json({
            message:"There was an error deleting the project"
        })
    }
})
export default router