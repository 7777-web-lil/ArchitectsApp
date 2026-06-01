type Props={
    title:string
    description:string
    onUpdate:(id:string)=>void
    _id:string
}
const Project= ({title,description,onUpdate,_id}:Props)=>{
    return(
        <div>
           <h4>{title}</h4>
           <p>{description}</p>
            <button onClick={()=>onUpdate(_id)}>Update</button>
        </div>
    )

}
export default Project