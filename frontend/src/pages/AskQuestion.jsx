import { useState } from "react";
import { Textarea } from "@material-tailwind/react";
import { Topbar } from "../components/Topbar";
import { Index } from "../components/Index";
import { Button } from "@material-tailwind/react";
import axios from "axios"



export const AskQuestion = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [Tags, setTags] = useState([""]);
    const [tag, setTag] = useState("");
    
    function addTags(){
        
        setTags([...Tags, tag])
        console.log(Tags)
    }
    
    return <div >
    <Topbar />
    
    <div className=" h-auto flex ">
        <div className="min-w-52 max-w-52">
        <Index />
        </div>
        
        <div className="m-8 p-6">
        <div className="flex w-96 flex-col gap-6">
        <Textarea onChange={e=>{
            setTitle(e.target.value);
        }} className="w-[32rem]" size="lg" label="Title" rows={3} />
        <Textarea  onChange={e=>{
            setDescription(e.target.value);
        }}  className="w-[40rem]" size="md" label="Description" rows={8} />
        <div>
        <input onChange={e=>{
            setTag(e.target.value)
        }} className="p-2" placeholder="tag"></input>
        <button onClick={addTags} className="p-2">add tag</button>
        </div>
        <div className="w-32" ><Button onClick={()=>{
            
            axios.post("http://localhost:3000/api/v1/post/post",{
                title,
                description,
                Tags
            },{
                headers:{
                    Authorization: "Bearer "+ localStorage.getItem("token")
                }
            })
            alert("Post uploaded successfully!")
        
        }} fullWidth varient="outlined" size="lg" color="blue" >Post</Button></div>
        
    </div>
        </div>
    </div>
</div>
}