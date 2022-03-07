import {getSession} from "next-auth/client";

export const Session = async (context)=>{
    const session = await getSession({req:context.req})
    if(!session){
        return{
            redirect:{
                destination:"/login",
                permanent:false
            }
        }
    }
    return {session};
}