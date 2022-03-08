import {getSession} from "next-auth/react";

export const auth = async ({context})=>{
    const session = await getSession({context})
    if(!session){
        return{
            redirect:{
                destination:"/login",
                permanent:false
            }
        }
    }
    return session;
}