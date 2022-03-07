import { useEffect, useState } from "react";
import Register from "../components/preLogin/Register";
import {getSession} from "next-auth/react";
import { useRouter } from "next/router";

function Home(){
    const router = useRouter();
    const [loading,setLoading] = useState(true)

    useEffect(()=>{
        getSession().then(session => {
            if(session){
                router.replace("/dashboard")
            }else{
                setLoading(false);
            }
        })
    },[router])

    if(loading){
        return <div>...loading</div>
    }

return <Register />

}

export default Home;