import CreateProfile from "../../components/profile/CreateProfile";
import {getSession} from "next-auth/react";

function CreateProfilePage(){
return <CreateProfile />

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