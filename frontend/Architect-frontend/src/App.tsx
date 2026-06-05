import { useEffect, useState } from "react";
import axios from "axios";
import './App.css'
import Project from "./Project.tsx";

type ProjectType = {
    _id: string;
    title: string;
    description: string;
    images: {
        twoD: string[];
        threeD: string[];
    };
};

function App() {
    const[title,setTitle]= useState("")
    const[description,setDescription]=useState("")
    const [twoDImage, setTwoDImage] = useState("");
    const [threeDImage, setThreeDImage] = useState("");
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
            description,
            images: {
                twoD: [twoDImage],
                threeD: [threeDImage]
            }
        })
        .then((res)=>{
            setProjects([...projects,res.data])

            setTitle("")
            setDescription("")
            setTwoDImage("")
            setThreeDImage("")
        })

}
const handleUpdateProject=(
    id:string,
    data: {
        title: string;
        description: string;
        images:{
            twoD:string[]
            threeD:string[]
        }
        }


)=>{
    axios
        .put(`http://localhost:3000/projects/${id}`,data)
        //     title,
        //     description,
        //     images: {
        //         twoD: [twoDImage],
        //         threeD: [threeDImage]
        //     }
        // })
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
        <div className="app-container">

            <div className="dashboard">

                <h1 className="page-title">Architect Dashboard</h1>

                <div className="project-form">
                    <input
                        placeholder="Project title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <input
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <input
                        placeholder="2D Image URL"
                        value={twoDImage}
                        onChange={(e) => setTwoDImage(e.target.value)}
                    />

                    <input
                        placeholder="3D Image URL"
                        value={threeDImage}
                        onChange={(e) => setThreeDImage(e.target.value)}
                    />

                    <button onClick={handleCreateProject}>
                        + Add Project
                    </button>
                </div>

                <div className="projects-grid">
                    {projects.map((p) => (
                        <Project
                            key={p._id}
                            _id={p._id}
                            title={p.title}
                            description={p.description}
                            images={p.images}
                            onSave={handleUpdateProject}
                            onDelete={handleDeleteProject}
                        />
                    ))}
                </div>

            </div>
        </div>

    </>
  )
}

export default App
