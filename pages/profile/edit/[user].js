import axios from "axios";
import EditProfile from "../../../components/profile/EditProflle";

function EditProfilePage({profile}){
return <EditProfile profile={{...profile}} />

}

export async function getServerSideProps(context){
    const response = await axios.get(`http://localhost:3000/api/profile/find-user/${context.params.user}`,{ headers: { cookie: context.req.headers.cookie } });
    const data = await response.data.profile[0];
    return{
        props:{
            profile:data,
        }
    }
}

export default EditProfilePage;