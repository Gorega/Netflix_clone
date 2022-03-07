import axios from "axios";
import { getSession } from "next-auth/react";
import ProfileFace from "../../components/profile/ProfileFace"; 

function UserPage({profiles}){
return <ProfileFace profiles={profiles} />

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

    const response = await axios.get(`http://localhost:3000/api/profile/user-data`,{ headers: { cookie: context.req.headers.cookie } });
    const data = await response.data;
    return{
        props:{
            profiles:data.user.profiles,
            session:session
        }
    }
}

export default UserPage;