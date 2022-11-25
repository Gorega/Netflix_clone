import axios from "axios";
import {server} from "../../../lib/server";
import EditProfile from "../../../components/profile/EditProflle";
import {getSession} from "next-auth/react"
import Head from "next/head";

function EditProfilePage({profile}){
    return <>
        <Head>
            <title>Edit Profile</title>
        </Head>
        <EditProfile profile={{...profile}} />
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
    const response = await axios.get(`${server}/api/profile/find-user/${context.params.user}`,{ headers: { cookie: context.req.headers.cookie } });
    const data = await response.data.profile[0];
    return{
        props:{
            profile:data,
            session
        }
    }
}

export default EditProfilePage;