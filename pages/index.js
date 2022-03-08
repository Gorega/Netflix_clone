import { useState } from "react";
import Register from "../components/preLogin/Register";
import {useSession} from "next-auth/react";
import { useRouter } from "next/router";

function Home(){
    const router = useRouter();
    const [loading,setLoading] = useState(true)
    const {status} = useSession({
        required:true,
        onUnauthenticated(){
            setLoading(false)
        }
    });

    if(status === "authenticated"){
        router.replace("/dashboard");
    }

    if(loading){
        return <div>...loading</div>
    }

return <Register />

}

export default Home;