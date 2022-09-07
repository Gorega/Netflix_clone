import styles from "../../styles/Home.module.css";
import Poster from "../../components/Poster";
import Section from "../../components/Section";
import Nav from "../../components/Nav";
import axios from "axios";
import { requests } from "../../lib/requests";
import {getSession} from "next-auth/react";
import Head from "next/head";
import { useEffect, useState } from "react";

function Kids({poster,kidsMovies,popularMoviesList,topRatedMoviesList}){

    const [trailerPath,setTrailerPath] = useState([]);

    const fetchRandomMovieTrailer = async ()=>{
        const MDB_URL = process.env.NEXT_PUBLIC_MDB_URL;
        const api_key = process.env.NEXT_PUBLIC_MDB_API_KEY;

        const videoRes = await axios.get(`${MDB_URL}/movie/${poster.id}/videos?api_key=${api_key}`);
        const videoData = await videoRes.data;
        setTrailerPath(videoData);
    }

    useEffect(()=>{
        fetchRandomMovieTrailer();
    },[])

    return <>
        <Head>
            <title>Kids</title>
        </Head>
        <Nav />
        <div className={styles.home}>
            <Poster title={poster.title} description={poster.overview} poster={poster.backdrop_path} route="movies" id={poster.id} trailerPath={trailerPath} />
            <Section title="Kids Movies" list={kidsMovies} />
            <Section title="Popular Kids Movies" list={popularMoviesList} />
            <Section title="Top Rated Kids Movies" list={topRatedMoviesList} />
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

    const [kidsMoviesRes,popularKidsMoviesListRes,topRatedKidsMoviesListRes] = await Promise.all([
        axios.get(`${requests.fetchDiscoverMovies}&with_genres=16`),
        axios.get(requests.fetchPopularMovies),
        axios.get(requests.fetchTopRatedMovies)
    ]);

    const [kidsMovies,popularKidsMoviesList,topRatedKidsMovies] = await Promise.all([
        kidsMoviesRes.data.results,
        popularKidsMoviesListRes.data.results.filter(movies => movies.genre_ids.includes(16)),
        topRatedKidsMoviesListRes.data.results.filter(movies => movies.genre_ids.includes(16))
    ]);
    
    return{
        props:{
            poster:kidsMovies[Math.floor(Math.random() * kidsMovies .length - 1)],
            kidsMovies:kidsMovies,
            popularMoviesList:popularKidsMoviesList,
            topRatedMoviesList:topRatedKidsMovies,
            session
        }
    }
}

export default Kids;