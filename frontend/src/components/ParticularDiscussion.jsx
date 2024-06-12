import { useEffect, useState } from "react"
import { Button } from "./Button"
import { InputBox } from "./InputBox"
import axios from "axios"
import { useNavigate } from "react-router-dom"
export const ParticularDiscussion = ({discussionId,name}) =>{
    const navigate = useNavigate();
    const [comment, setComment] = useState([])
    const [text, setText] = useState("");
    const [count, setCount] = useState(0)
   
    useEffect(()=>{
    async function fetchMyApi(){
        await axios.get("http://localhost:3000/api/v1/user/comment/"+discussionId)
        .then(response=>{
            setComment(response.data.comment)
        })
    }
    fetchMyApi() 
    },[discussionId,count])
    
    return <div className=" w-[48rem]">
        <div className="flex justify-between shadow-lg h-10">
        <div className="  text-xl pl-4 font-serif">{name}</div>
        <div className="pr-2  "><Button onClick={(e)=>{
            e.persist()
            navigate("/searchusers?id1="+discussionId)
        }} label={"INVITE"}/></div>
        </div>
        <div className="m-8">
            <div>{comment?.map(comm => <ShowComment comment ={comm}/>)}</div>
            <div className="flex mt-10">
            <div className="w-[32rem] pl-2"><InputBox onChange={e =>{
                setText(e.target.value)
            }} placeholder={"do comment"}/></div>
            <div className="mt-3 ml-4"><Button onClick={async ()=>{
                await axios.post("http://localhost:3000/api/v1/user/comment/"+ discussionId,{
                    
                        description: text
                    },{
                        headers:{
                            Authorization: "Bearer " + localStorage.getItem("token")
                        }
                    })
                    
                        setCount(count+1)
                    
                 
                }
            } label={"Post"}/></div>
            </div>
        </div>
    </div>

}

function ShowComment({comment}){
    return <div className="">
        <div>{comment.description}</div>
        <div className="flex justify-end">{comment.firstName}</div>
    </div>
}