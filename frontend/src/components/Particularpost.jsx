import axios from "axios";
import {useState, useEffect} from "react";
import { CommentBoxTextarea } from "./CommentBox";

export const Particularposts = (props) =>{
    const [reply, setReply] = useState("");
    const postId = props.id;
    const name = props.name;
    const [post, setPost] = useState([]);
    const [comments, setComments] = useState([]);
    useEffect(() =>{
        axios.get("http://localhost:3000/api/v1/post/getpost/"+postId)
        .then(response => {
            setPost(response.data.post)
            setComments(response.data.comment)
        })
    }, [])
    return <div className="m-8">
        <div className="bg-slate-100 flex justify-between w-[52rem] mt-10 ml-8 shadow-lg h-16">
        <div className="  pl-6 pt-3 text-2xl font-semibold  italic ">
            Top Question
        </div>
        <div className="pr-2 pt-8">
        <button  onClick={(e) =>{
                e.persist();
                navigate("/askquestion?name="+name)
            }} className="cursor-pointer transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300">Ask Question</button>
        </div>
    </div>
    <div className="w-[52rem]   mt-8 ml-8 p-4">
        <div className="bg-violet-100">
        <div className="text-xl">{post.title}</div>
        <div className="shadow-lg mt-6 p-3 h-auto">{post.description}</div>
        <div className="flex">
        
        {post.Tags?.map(tag => <Tag title = {tag} />)}
        
      </div>
      </div>
      <div >
        <div className="flex justify-end pr-8 mr-4">asked by</div>
        
        <div className="flex justify-end pr-8 mr-4">{name}</div>
      </div>
      <div>
      {comments?.map(comment => <Comment key = {comment._id} description = {comment.description} user = {comment.firstName}/>)}
      </div>
      <div>
        
        <CommentBoxTextarea onChange={e =>{
            setReply(e.target.value);
        }} onClick={async () =>{
            const response = await axios.post("http://localhost:3000/api/v1/post/comment/"+postId , {
                description: reply
            },{
                headers:{
                    Authorization: "Bearer "+localStorage.getItem("token")
                }
            }
        );
        }}/>
      </div>
    </div>
    </div>
}

function Tag({title}){
    
    return  <div className="bg-violet-50 pr-1 pl-1 mr-2 cursor-pointer shadow-lg  ">
    {title}
</div>
}
function Comment({description, user}){
   return <div className="m-8 mr-8 pl-6 shadow-lg bg-violet-100 ">
    <div >{description}</div>
    <div >
        <div className="flex justify-end  pr-8">answered by</div>
        <div className="flex justify-end  pr-8">{user}</div></div>
    
   
   </div>

    
}