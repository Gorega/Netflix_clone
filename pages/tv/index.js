import styles from "../../styles/Home.module.css";
import Poster from "../../components/Poster";
import Section from "../../components/Section"
import axios from "axios";
import Nav from "../../components/Nav";
import { requests } from "../../lib/requests";
import {getSession} from "next-auth/react"
import Head from "next/head";
import { useEffect, useState } from "react";

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

    const response = await axios.get(requests.fetchDiscoverTv);
    const data = await response.data.results;
    const randomTvShow = data[Math.floor(Math.random() * data.length - 1)];

    // fetch popular tv
    const popularTvRes = await axios.get(requests.fetchAiringTodayTv);
    const popularTvData = await popularTvRes.data.results;

    // fetch top_rated tv
    const topRatedTvRes = await axios.get(requests.fetchTopRatedTv);
    const topRatedTvData = await topRatedTvRes.data.results;

    return {
        props:{
            poster:randomTvShow,
            tvShows:data,
            popularTv:popularTvData,
            topRatedTv:topRatedTvData,
            session
        }
    }
}

export default Tv;