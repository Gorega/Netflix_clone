import Login from "../../components/preLogin/Login";
import {useSession} from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

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

return <>
    <Head>
        <title>Login</title>
    </Head>
    <Login />
</>

}

export default LoginPage;