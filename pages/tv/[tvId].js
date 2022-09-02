import styles from "../../styles/movie/Movie.module.css";
import Header from "../../components/movie/Header";
import axios from "axios";
import MovieBody from "../../components/movie/MovieBody";
import {getSession} from "next-auth/react";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const MDB_URL = process.env.NEXT_PUBLIC_MDB_URL
const api_key = process.env.NEXT_PUBLIC_MDB_API_KEY;

function Movie({movie,credits,reviews,keywords,socialLinks}){

    const router = useRouter();
    const {tvId} = router.query;
    const [trailerPath,setTrailerPath] = useState([]);
    const [recommendations,setRecommendations] = useState([]);

    const fetchMovieTrailer = async ()=>{
        const videoRes = await axios.get(`${MDB_URL}/tv/${tvId}/videos?api_key=${api_key}`);
        const videoData = await videoRes.data;
        setTrailerPath(videoData);
    }

    const fetchMovieRecommendations = async()=>{
        const recommendationRes = await axios.get(`${MDB_URL}/tv/${tvId}/recommendations?api_key=${api_key}`);
        const recommendationData = await recommendationRes.data.results;
        setRecommendations(recommendationData);
    }

    useEffect(()=>{
        fetchMovieTrailer();
        fetchMovieRecommendations();
    },[tvId])

    return <>
    <Head>
        <title>{movie.name}</title>
    </Head>
    <div className={styles.movie}>
        <Header movie={{...movie}}
                credits={credits}
                trailer={trailerPath}
        />
        <MovieBody credits={credits}
                reviews={reviews[0]}
                recommendation={recommendations}
                movie={{...movie}}
                keywords={keywords}
                videos={trailerPath}
                social={{...socialLinks}}
                route={"tv"}
        />
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

    const {tvId} = context.params

    const response = await axios.get(`${MDB_URL}/tv/${tvId}?api_key=${api_key}`);
    const data = await response.data;

    // fetch movie Paricipants
    const ParicipantsRes = await axios.get(`${MDB_URL}/tv/${tvId}/credits?api_key=${api_key}`);
    const ParicipantsData = await ParicipantsRes.data;

    // fetch movie Reviews
    const reviewsRes = await axios.get(`${MDB_URL}/tv/${tvId}/reviews?api_key=${api_key}`);
    const reviewsData = await reviewsRes.data.results;

    
    // fetch movie keywords
    const keywordsRes = await axios.get(`${MDB_URL}/tv/${tvId}/keywords?api_key=${api_key}`);
    const keywordsData = await keywordsRes.data;
    
    // fetch movie social media links
    const socialRes = await axios.get(`${MDB_URL}/tv/${tvId}/external_ids?api_key=${api_key}`);
    const socialData = await socialRes.data;
    
    return{
        props:{
            movie:data,
            credits:ParicipantsData,
            reviews:reviewsData,
            keywords:keywordsData,
            socialLinks:socialData,
            session
        }
    }
}

export default Movie;