import { useEffect, useState } from "react";
import axios from "axios";
import './App.css'
import Project from "./Project.tsx";

type ProjectType = {
    _id: string;
    title: string;
    description: string;
};

function App() {
    const[title,setTitle]= useState("")
    const[description,setDescription]=useState("")
    const [projects,setProjects]= useState<ProjectType[]>([]);
    useEffect(() => {
        axios
            .get("http://localhost:3000/projects")
            .then((res) => setProjects(res.data))
            .catch((err) => console.log(err));
    }, []);
const handleCreateProject= ()=>{
    axios
        .post("http://localhost:3000/projects",{
            title,
            description
        })
        .then((res)=>{
            setProjects([...projects,res.data])

            setTitle("")
            setDescription("")
        })

}
const handleUpdateProject=(id:string)=>{
    axios
        .put(`http://localhost:3000/projects/${id}`,{
            title,
            description
        })
        .then((res)=>{
            setProjects(
                projects.map((proj)=>
                    proj._id === id ? res.data :proj
                )
            )
        })
        .catch((error)=>console.log(error))
}
const handleDeleteProject=(id:string)=>{
    axios
        .delete(`http://localhost:3000/projects/${id}`)
        .then(()=>{
            setProjects(
                projects.filter((proj)=>
                    proj._id !== id
                )
            )
        })
        .catch((error)=>console.log(error))
}
  return (
    <>
        <div>
            <input
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <input
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <button onClick={handleCreateProject}>
                Add Project
            </button>
        </div>
        <div>
            <h1>Architect Projects</h1>

            {projects.map((p) => (
                <Project
                    key={p._id}
                    _id={p._id}
                    title={p.title}
                    description={p.description}
                    onUpdate={handleUpdateProject}
                    onDelete={handleDeleteProject}
                />
            ))}
        </div>
    </>
  )
}

export default App
