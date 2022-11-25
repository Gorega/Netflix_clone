import styles from "../../styles/Home.module.css";
import axios from "axios";
import { requests } from "../../lib/requests";
import {getSession} from "next-auth/react"
import { useEffect, useState } from "react";
import Poster from "../../components/Poster";
import Section from "../../components/Section"
import Nav from "../../components/Nav";
import Head from "next/head";

function Tv({poster,tvShows,popularTv,topRatedTv}){

    const [trailerPath,setTrailerPath] = useState([]);

    const fetchRandomMovieTrailer = async ()=>{
        const MDB_URL = process.env.NEXT_PUBLIC_MDB_URL;
        const api_key = process.env.NEXT_PUBLIC_MDB_API_KEY;

        const videoRes = await axios.get(`${MDB_URL}/tv/${poster.id}/videos?api_key=${api_key}`);
        const videoData = await videoRes.data;
        setTrailerPath(videoData);
    }

    useEffect(()=>{
        fetchRandomMovieTrailer();
    },[])

    return <>
    <Head>
        <title>TV Shows</title>
    </Head>
    <Nav />
    <div className={styles.home}>
        <Poster title={poster.name} description={poster.overview} poster={poster.backdrop_path} route="tv" id={poster.id} trailerPath={trailerPath} />
        <Section title="TV Show" list={tvShows} route={"tv"} />
        <Section title="Popular TV Shows" list={popularTv} route={"tv"} />
        <Section title="Top Rated TV Shows" list={topRatedTv} route={"tv"} />
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

    const [tvShowsRes,popularTvShowRes,topRatedTvShowRes] = await Promise.all([
        axios.get(requests.fetchDiscoverTv),
        axios.get(requests.fetchAiringTodayTv),
        axios.get(requests.fetchTopRatedTv),
      ]);
  
      const [tvShows,popularTvShows,topRatedTvShows] = await Promise.all([
        tvShowsRes.data.results,
        popularTvShowRes.data.results,
        topRatedTvShowRes.data.results,
      ]);

    return {
        props:{
            poster:tvShows[Math.floor(Math.random() * tvShows.length - 1)],
            tvShows:tvShows,
            popularTv:popularTvShows,
            topRatedTv:topRatedTvShows,
            session
        }
    }
}

export default Tv;