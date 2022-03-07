import styles from "../../styles/movie/Movie.module.css";
import Header from "../../components/movie/Header";
import axios from "axios";
import MovieBody from "../../components/movie/movieBody";
import {getSession} from "next-auth/react"
import { useRouter } from "next/router";

function Movie({movie,credits,reviews,media,videos,recommendations,keywords,socialLinks}){
    const router = useRouter();
    if(router.isFallback){
        return <div className={styles.error}>
            Not found
        </div>
    }

return <div className={styles.movie}>
    <Header movie={{...movie}} credits={credits} trailer={{...videos}}
    />
    <MovieBody credits={credits} reviews={reviews[0]} media={media} recommendation={recommendations} movie={{...movie}}
                 keywords={keywords} videos={videos} social={{...socialLinks}} route={"movies"}
    />

</div>

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
    const {movieId} = context.params
    const response = await axios.get(`${MDB_URL}/movie/${movieId}?api_key=${api_key}`);
    const data = await response.data;

    // fetch movie Paricipants
    const ParicipantsRes = await axios.get(`${MDB_URL}/movie/${movieId}/credits?api_key=${api_key}`);
    const ParicipantsData = await ParicipantsRes.data;

    // fetch movie Reviews
    const reviewsRes = await axios.get(`${MDB_URL}/movie/${movieId}/reviews?api_key=${api_key}`);
    const reviewsData = await reviewsRes.data.results;

    // fetch movie Media
    const mediaRes = await axios.get(`${MDB_URL}/movie/${movieId}/images?api_key=${api_key}`);
    const mediaData = await mediaRes.data;

    // fetch movie Videos
    const videosRes = await axios.get(`${MDB_URL}/movie/${movieId}/videos?api_key=${api_key}`);
    const videosData = await videosRes.data;

    // fetch movie recommendations
    const recommendationRes = await axios.get(`${MDB_URL}/movie/${movieId}/recommendations?api_key=${api_key}`);
    const recommendationData = await recommendationRes.data.results;

    // fetch movie keywords
    const keywordsRes = await axios.get(`${MDB_URL}/movie/${movieId}/keywords?api_key=${api_key}`);
    const keywordsData = await keywordsRes.data;

    // fetch movie social media links
    const socialRes = await axios.get(`${MDB_URL}/movie/${movieId}/external_ids?api_key=${api_key}`);
    const socialData = await socialRes.data;


    return{
        props:{
            movie:data,
            credits:ParicipantsData,
            reviews:reviewsData,
            media:mediaData,
            recommendations:recommendationData,
            keywords:keywordsData,
            videos:videosData,
            socialLinks:socialData,
            session:session
        }
    }
}

export default Movie;