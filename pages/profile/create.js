import CreateProfile from "../../components/profile/CreateProfile";
import {getSession} from "next-auth/react";
import Head from "next/head";

function CreateProfilePage(){
return <>
<Head>
    <title>Add Profile</title>
</Head>
<CreateProfile />
</>

}

export async function getServerSideProps(context){
    const session = await getSession({req:context.req});
    if(!session){
        return{
            redirect:{
                destination:"/login",
                permanent:false
            }
        }
    }
    return{
        props:{
            
        }
    }
}

export default CreateProfilePage;