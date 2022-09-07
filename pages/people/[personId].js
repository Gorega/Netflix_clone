import axios from "axios";
import PersonHome from "../../components/person/PersonHome";
import {getSession} from "next-auth/react"
import Head from "next/head";

function Person({person,credits,socialLinks}){
return <>
    <Head>
        <title>{person.name}</title>
    </Head>
    <PersonHome person={{...person}} credits={{...credits}} social={{...socialLinks}} />
</>
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

    const MDB_URL = process.env.NEXT_PUBLIC_MDB_URL
    const api_key = process.env.NEXT_PUBLIC_MDB_API_KEY;
    const {personId} = context.params;

    const [personRes,creditsRes,socialLinksRes] = await Promise.all([
        axios.get(`${MDB_URL}/person/${personId}?api_key=${api_key}`),
        axios.get(`${MDB_URL}/person/${personId}/combined_credits?api_key=${api_key}`),
        axios.get(`${MDB_URL}/person/${personId}/external_ids?api_key=${api_key}`)
    ]);

    const [person,credits,socialLinks] = await Promise.all([
        personRes.data,
        creditsRes.data,
        socialLinksRes.data
    ])

    return{
        props:{
            person:person,
            credits:credits,
            socialLinks:socialLinks,
            session
        }
    }
}

export default Person;