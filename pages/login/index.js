import Login from "../../components/preLogin/Login";
import {useSession} from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";

function LoginPage(){
    const router = useRouter();
    const [loading,setLoading] = useState(true);
    const {status} = useSession({
        required:true,
        onUnauthenticated(){
            setLoading(false)
        }
    });
    
    if(status === "authenticated"){
        router.replace("/profile")
    }

    if(loading){
        return <div>...loading</div>
    }

return <Login />

}

export default LoginPage;