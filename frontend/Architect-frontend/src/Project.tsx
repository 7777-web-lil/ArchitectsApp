import {useState} from "react";

type Props={
    title:string
    description:string
    // onUpdate:(id:string)=>void
    onDelete:(id:string)=>void
    onSave: (id: string, data: {
        title: string;
        description: string;
        images:{
            twoD:string[]
            threeD:string[]
        }
    }) => void;
    _id:string
    images: {
        twoD: string[];
        threeD: string[];
    };
}
const Project= ({title,description,_id,onSave, onDelete,images}:Props)=> {
    const [isEditing, setIsEditing] = useState(false)
    const [editTitle, setEditTitle] = useState(title);
    const [editDescription, setEditDescription] = useState(description);
    return (
        <div className="project-card">

            {!isEditing ? (
                <>
                    <h4 className="title">{title}</h4>
                    <p className="description">{description}</p>

                    <div className="image-section">
                        <h5>2D Floor Plan Design</h5>
                        {images.twoD?.map((img, index) => (
                            <img key={index} src={img} alt="2D design" className="project-image"/>
                        ))}
                    </div>

                    <div className="image-section">
                        <h5>3D Design Render</h5>
                        {images.threeD?.map((img, index) => (
                            <img key={index} src={img} alt="3D render" className="project-image"/>
                        ))}
                    </div>

                    <button className={"edit"} onClick={() => setIsEditing(true)}>
                        Edit
                    </button>

                    <button className={"delete"} onClick={() => onDelete(_id)}>
                        Delete
                    </button>
                </>
            ) : (
                <>
                    <input
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                    />

                    <input
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                    />

                    <button
                        onClick={() => {
                            onSave(_id, {
                                title: editTitle,
                                description: editDescription,
                                images
                            });

                            setIsEditing(false);
                        }}
                    >
                        Save
                    </button>

                    <button onClick={() => setIsEditing(false)}>
                        Cancel
                    </button>
                </>
            )}

        </div>
    )
}

export default Project