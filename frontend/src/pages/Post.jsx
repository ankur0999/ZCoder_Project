import { Topbar } from "../components/Topbar"
import { Particularposts  } from "../components/Particularpost";
import { Index } from "../components/Index";
import { useSearchParams } from "react-router-dom";

export const Post = () =>{
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    return <div >
        <Topbar />
        
        <div className=" h-auto flex ">
            <div className="min-w-52 max-w-52">
            <Index />
            </div>
            
            <div>
            <Particularposts id={id} name = {name} />
            </div>
            
            
            
        </div>
    </div>
}