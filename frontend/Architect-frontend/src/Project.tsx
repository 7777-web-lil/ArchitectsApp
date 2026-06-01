type Props={
    title:string
    description:string
    onUpdate:(id:string)=>void
    onDelete:(id:string)=>void
    _id:string
}
const Project= ({title,description,onUpdate,_id,onDelete}:Props)=>{
    return(
        <div>
           <h4>{title}</h4>
           <p>{description}</p>
            <button onClick={()=>onUpdate(_id)}>Update</button>
            <button onClick={()=>onDelete(_id)}>Delete</button>
        </div>
    )

}
export default Project