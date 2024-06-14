import { useState, useMemo, useEffect } from "react";
import { Textarea } from "@material-tailwind/react";
import { Topbar } from "../components/Topbar";
import { Index } from "../components/Index";
import { Button } from "@material-tailwind/react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";



export const EditQuestion = () => {
    const topbar = useMemo(()=><Topbar/>,[]);
    const index = useMemo(()=><Index/>,[]);
    const [post, setPost] = useState([]);
    const [searchParams] = useSearchParams();
    const postId = searchParams.get("postId");
    const [title, setTitle] = useState(post.title);
    const [description, setDescription] = useState(post.description);
    
    
    useEffect(() =>{
        async function fetchMyApi(){
        await axios.get("http://localhost:3000/api/v1/post/getpost/"+postId)
        .then(response => {
            setPost(response.data.post)
            
        })
    }
    fetchMyApi()
    }, [])
    
    
    return <div className="bg-slate-50">
    {topbar}
    
    <div className=" h-auto flex ">
        <div className="min-w-52 max-w-52">
        {index}
        </div>
        
        <div className="m-8 p-6">
        <div className="flex w-96 flex-col gap-6">
        <Textarea onChange={e=>{
            setTitle(e.target.value);
        }} className="w-[32rem]" size="lg" label="Title" rows={3}  defaultValue={post.title}   />
        <Textarea  onChange={e=>{
            setDescription(e.target.value);
        }}  className="w-[40rem]" size="md" label="Description" rows={8} defaultValue={post.description} />
       
        <div className="w-32" ><Button onClick={async()=>{
            
            await axios.put("http://localhost:3000/api/v1/post/update/"+postId,{
                title,
                description,
                Tags
            },{
                headers:{
                    Authorization: "Bearer "+ localStorage.getItem("token")
                }
            })
            alert("Post updated successfully!")
        
        }} fullWidth varient="outlined" size="lg" color="blue" >Post</Button></div>
        
    </div>
        </div>
    </div>
</div>
}