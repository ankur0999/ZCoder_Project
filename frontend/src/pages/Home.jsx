import { Topbar } from "../components/Topbar";
import { Index } from "../components/Index";
import { Posts } from "../components/Posts";

export const Home = () =>{
    
    return <div >
        <Topbar />
        
        <div className=" h-auto flex ">
            <div className="min-w-52 max-w-52">
            <Index />
            </div>
            
            <div>
               <Posts />
            </div>
            
            
            
        </div>
    </div>
}