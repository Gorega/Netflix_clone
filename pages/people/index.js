import axios from "axios";
import { useState } from "react";
import Nav from "../../components/Nav";
import PersonCard from "../../components/person/personCard";
import { requests } from "../../lib/requests";
import styles from "../../styles/People.module.css";
import {getSession} from "next-auth/react"

function People({people}){
    const [currentPage,setCurrentPage] = useState(1);
    const [peopleData,setPeopleData] = useState(people);
    const [loading,setLoading] = useState(false);
    let pages = [];
    // loop pages function
    for(let i=1;i <= 500; i++){
        pages.push(i);
    }

    const changePageHandler = async (currentPage)=>{
        setCurrentPage(currentPage)
        setLoading(true)
        const response = await axios.get(`${process.env.NEXT_PUBLIC_MDB_URL}/person/popular?api_key=${process.env.NEXT_PUBLIC_MDB_API_KEY}&page=${currentPage}`);
        const data = await response.data.results;
        setLoading(false)
        setPeopleData(data);
    }

return <>
<Nav />
<div className={styles.people}>
        <h2>Popular People</h2>
    <div className={styles.body}>
        {loading ? "...loading" : peopleData.map((person,index)=>{
            const knownFor = person.known_for.map((movie)=> movie.title || movie.name);
            return <PersonCard key={index} profile_id={person.id} profile_img={person.profile_path} profile_name={person.name} known_for={`${knownFor.join(", ").substring(0,50)} ...`} />
        })}
    </div>
    <div className={styles.pages}>
        <ul>
        {pages.slice(0,7).map((page,index)=>{
            return <li key={index} className={`${index === currentPage-1 && styles.active}`} onClick={()=> changePageHandler(index+1)}>{page}</li>
        })}
        </ul>
    </div>
</div>

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
    const response = await axios.get(requests.fetchPeople);
    const data = await response.data.results;

    return{
        props:{
            people:data,
        }
    }
}

export default People;