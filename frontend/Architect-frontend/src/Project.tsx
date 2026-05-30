type Props={
    title:string
    description:string
}
const Project= ({title,description}:Props)=>{
    return(
        <div>
           <h4>{title}</h4>
           <p>{description}</p>
        </div>
    )

}
export default Project