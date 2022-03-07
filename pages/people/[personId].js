import axios from "axios";
import PersonHome from "../../components/person/PersonHome";
import {getSession} from "next-auth/react"

function Person({person,credits,socialLinks}){
return <PersonHome person={{...person}} credits={{...credits}} social={{...socialLinks}} />
}

export async function getServerSideProps(context){

    const session = await getSession({req:context.req})

    if(!session){
        return{
            redirect:{
                destination:"/login",
                permanent:false
            }
        }
    }

    const MDB_URL = "http://api.themoviedb.org/3"
    const api_key = "be027be57471a5c67b6018f8805cdba2";
    const {personId} = context.params;
    const personRes = await axios.get(`${MDB_URL}/person/${personId}?api_key=${api_key}`);
    const personData = await personRes.data;

    // fetch person credits
    const creditsRes = await axios.get(`${MDB_URL}/person/${personId}/combined_credits?api_key=${api_key}`);
    const creditsData = await creditsRes.data;

    // fetch Person Social Links
    const socialRes = await axios.get(`${MDB_URL}/person/${personId}/external_ids?api_key=${api_key}`);
    const socialData = await socialRes.data;

    return{
        props:{
            person:personData,
            credits:creditsData,
            socialLinks:socialData,
            session
        }
    }
}

export default Person;