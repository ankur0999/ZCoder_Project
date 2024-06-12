import { Topbar } from "../components/Topbar";
import { Index } from "../components/Index";
import { SearchUser } from "../components/SearchUser";

export const Users = () =>{
    
    return <div >
        <Topbar />
        
        <div className=" h-auto flex ">
            <div className="min-w-52 max-w-52">
            <Index />
            </div>
            
            <div>
               <SearchUser />
            </div>
            
            
            
        </div>
    </div>
}