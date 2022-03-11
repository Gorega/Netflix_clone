import styles from "../../styles/Home.module.css";
import Poster from "../../components/Poster";
import Section from "../../components/Section";
import Nav from "../../components/Nav";
import axios from "axios";
import { requests } from "../../lib/requests";
import {getSession} from "next-auth/react";
import Head from "next/head";

function Kids({poster,kidsMovies,popularMoviesList,topRatedMoviesList}){
return <>
    <Head>
        <title>Kids</title>
    </Head>
    <Nav />
    <div className={styles.home}>
        <Poster title={poster.title} description={poster.overview} poster={poster.backdrop_path} route="movies" id={poster.id} />
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

    const response = await axios.get(`${requests.fetchDiscoverMovies}&with_genres=16`);
    const data = await response.data.results;
 
    // fetch popular movies
    const popularMoviesRes = await axios.get(requests.fetchPopularMovies);
    const popularMoviesData = await popularMoviesRes.data.results.filter((movie)=> movie.genre_ids.includes(16));
    
    // fetch top rated movies
    const topRatedMoviesRes = await axios.get(requests.fetchTopRatedMovies);
    const topRatedMoviesData = await topRatedMoviesRes.data.results.filter((movie)=> movie.genre_ids.includes(16));
    
    return{
        props:{
            poster:data[Math.floor(Math.random() * data.length - 1)],
            kidsMovies:data,
            popularMoviesList:popularMoviesData,
            topRatedMoviesList:topRatedMoviesData,
            session
        }
    }
}

export default Kids;