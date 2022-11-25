import styles from "../../styles/movie/Movie.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {getSession} from "next-auth/react"
import Header from "../../components/movie/Header";
import MovieBody from "../../components/movie/MovieBody";
import Head from "next/head";

const MDB_URL = process.env.NEXT_PUBLIC_MDB_URL;
const api_key = process.env.NEXT_PUBLIC_MDB_API_KEY;

function Movie({movie,credits,reviews,keywords,socialLinks}){
    const router = useRouter();
    const {movieId} = router.query;
    const [trailerPath,setTrailerPath] = useState([]);
    const [recommendations,setRecommendations] = useState([]);

    const fetchMovieTrailer = async ()=>{
        const videoRes = await axios.get(`${MDB_URL}/movie/${movieId}/videos?api_key=${api_key}`);
        const videoData = await videoRes.data;
        setTrailerPath(videoData);
    }

    const fetchMovieRecommendations = async()=>{
        const recommendationRes = await axios.get(`${MDB_URL}/movie/${movieId}/recommendations?api_key=${api_key}`);
        const recommendationData = await recommendationRes.data.results;
        setRecommendations(recommendationData);
    }

    useEffect(()=>{
        fetchMovieTrailer();
        fetchMovieRecommendations();
    },[movieId])

return <>
    <Head>
        <title>{movie.title}</title>
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
                route={"movies"}
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

    const {movieId} = context.params

    if(!movieId){
        return{
            redirect:{
                destination:"/dashboard"
            }
        }
    }

    const [movieRes,creditsRes,reviewsRes,keywordsRes,socialLinksRes] = await Promise.all([
        axios.get(`${MDB_URL}/movie/${movieId}?api_key=${api_key}`),
        axios.get(`${MDB_URL}/movie/${movieId}/credits?api_key=${api_key}`),
        axios.get(`${MDB_URL}/movie/${movieId}/reviews?api_key=${api_key}`),
        axios.get(`${MDB_URL}/movie/${movieId}/keywords?api_key=${api_key}`),
        axios.get(`${MDB_URL}/movie/${movieId}/external_ids?api_key=${api_key}`)
    ])

    const [movie,credits,reviews,keywords,socialLinks] = await Promise.all([
        movieRes.data,
        creditsRes.data,
        reviewsRes.data.results,
        keywordsRes.data,
        socialLinksRes.data
    ])

    return{
        props:{
            movie:movie,
            credits:credits,
            reviews:reviews,
            keywords:keywords,
            socialLinks:socialLinks,
            session
        }
    }
}

export default Movie;