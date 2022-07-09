import styles from "../../styles/Home.module.css";
import Poster from "../../components/Poster";
import Section from "../../components/Section";
import Nav from "../../components/Nav";
import axios from "axios";
import { requests } from "../../lib/requests";
import {getSession} from "next-auth/react";
import Head from "next/head";

function Kids({poster,kidsMovies,popularMoviesList,topRatedMoviesList,trailerPath}){
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

    const MDB_URL = process.env.NEXT_PUBLIC_MDB_URL;
    const api_key = process.env.NEXT_PUBLIC_MDB_API_KEY;

    const response = await axios.get(`${requests.fetchDiscoverMovies}&with_genres=16`);
    const data = await response.data.results;
    const randomMovie = data[Math.floor(Math.random() * data.length - 1)]; 

    // fetch movie Videos
    const videoRes = await axios.get(`${MDB_URL}/movie/${randomMovie.id}/videos?api_key=${api_key}`,{headers:{
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "text/plain",
      }});
    const videoData = await videoRes.data;
 
    // fetch popular movies
    const popularMoviesRes = await axios.get(requests.fetchPopularMovies);
    const popularMoviesData = await popularMoviesRes.data.results.filter((movie)=> movie.genre_ids.includes(16));
    
    // fetch top rated movies
    const topRatedMoviesRes = await axios.get(requests.fetchTopRatedMovies);
    const topRatedMoviesData = await topRatedMoviesRes.data.results.filter((movie)=> movie.genre_ids.includes(16));
    
    return{
        props:{
            poster:randomMovie,
            kidsMovies:data,
            popularMoviesList:popularMoviesData,
            topRatedMoviesList:topRatedMoviesData,
            trailerPath:videoData,
            session
        }
    }
}

export default Kids;