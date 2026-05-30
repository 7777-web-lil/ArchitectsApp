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
        })

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
                    title={p.title}
                    description={p.description}
                />
            ))}
        </div>
    </>
  )
}

export default App
