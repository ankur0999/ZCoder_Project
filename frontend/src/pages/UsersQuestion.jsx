import { Topbar } from "../components/Topbar";
import { Index } from "../components/Index";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect,useState } from "react";
import axios from "axios";


export const UsersQuestion = () =>{
    const [searchParams] = useSearchParams();
    const userId = searchParams.get("id");
    const [feeds, setFeeds] = useState([])
    useEffect(()=>{
        async function fetchMyApi(){
         await axios.get("http://localhost:3000/api/v1/post/feeds/"+userId)
        .then(response=>{
            setFeeds(response.data.feeds)
        })
        }
        fetchMyApi()
    },[])
    return <div>
             <Topbar />
             <div className=" h-auto flex ">
            <div className="min-w-52 max-w-52">
            <Index />
            </div>
            
            <div>
            {feeds?.slice(0).reverse().map(feed => <Feed key = {feed._id} feed = {feed} />)}
            </div>
            
            
            
        </div>
    </div>
}

function Feed({feed}){
    const navigate = useNavigate();
    const [user, setUser] = useState("");
    useEffect( () => {
        axios.get("http://localhost:3000/api/v1/user/getuser/"+feed.userId)
        .then(response => {
            setUser(response.data.user)
        })
    })
    return <div className="m-8">
        
        <div className="h-20 shadow-lg p-2 m-4 w-[52rem] bg-violet-100">
            <div className="flex justify-between">
            <div className="font-semibold h-10 cursor-pointer">
                <button onClick={(e)=>{
                    navigate("/post?id="+feed._id + "&name="+ user)
                }} >
                {feed.title}</button>
                </div>
                <div>
                    <CheckPublic feed = {feed}  />
                </div>
                </div>
        <div className="flex justify-between">
            <div className="flex ">
                {feed.Tags?.map(tag => <Tag  title = {tag} />)}
            </div>
            <div className="flex">
                <div className="rounded-full bg-slate-300 w-6 flex justify-center mr-2 pb-1">
                    <div>{user[0]}</div></div>
                
                <div>{user}</div>
                
            </div>
        </div>
        </div>
    </div>
}

function Tag({title}){
    return <div className="pr-1 pl-1 mr-2 cursor-pointer shadow-lg  ">
        {title}
    </div>
}
function CheckPublic({feed}){
    if(feed.public === true){
    return <div className="flex">
    <div className="mr-2 ">private</div>
    <div className="shadow-xl bg-slate-400 rounded-md"><button onClick={changeVisibilty({feed})}>public</button></div>
</div>
    }
    else if(feed.public === false){
        return <div className="flex">
            <div className="mr-2 ">public</div>
            <div className="shadow-xl bg-slate-400 rounded-md"><button onClick={changeVisibilty({feed})}>private</button></div>
        </div>
    }
}

async function changeVisibilty({feed}){
    await axios.put("http://localhost:3000/api/v1/post/update/"+feed._id,{
        public: !feed.public
    },{
        headers:{
            Authorization: "Bearer "+localStorage.getItem("token")
        }
    })
}