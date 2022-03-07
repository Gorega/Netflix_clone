import Login from "../../components/preLogin/Login";
import {getSession} from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

function LoginPage(){
    const router = useRouter();
    const [loading,setLoading] = useState(true);
    useEffect(()=>{
        getSession().then(session =>{
            if(session){
                router.replace('/dashboard');
            }else{
                setLoading(false)
            }
        })
    },[router])

    if(loading){
        return <div>...loading</div>
    }
return <Login />

}

export default LoginPage;