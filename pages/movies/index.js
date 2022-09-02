import axios from "axios";
import {useEffect, useState } from "react";
import Poster from "../../components/Poster";
import Section from "../../components/Section";
import Nav from "../../components/Nav";
import { requests } from "../../lib/requests";
import styles from "../../styles/Home.module.css"
import {getSession} from "next-auth/react";
import Head from "next/head";

function Movies({poster,genres,selectedMovies,popularMovies,topRatedMovies}){

    const [selectValue,setSelectValue] = useState(null);
    const [title,setTitle] = useState(poster.title);
    const [description,setDescription] = useState(poster.overview);
    const [posterImage,setPosterImage] = useState(poster.backdrop_path);
    const [postId,setPosterId] = useState(poster.id)
    const [Movies,setMovies] = useState(selectedMovies);
    const [popular,setPopular] = useState(popularMovies);
    const [topRated,setTopRated] = useState(topRatedMovies);
    const [trailerPath,setTrailerPath] = useState([]);

    const getMoviePoster = (e)=>{
        setSelectValue(e.target.value);
        axios.get(`${process.env.NEXT_PUBLIC_MDB_URL}/discover/movie?with_genres=${e.target.value}&api_key=${process.env.NEXT_PUBLIC_MDB_API_KEY}`)
        .then(res => {
            const randomMovie = res.data.results[Math.floor(Math.random() * res.data.results.length - 1)]
            setTitle(randomMovie.title)
            setDescription(randomMovie.overview)
            setPosterImage(randomMovie.backdrop_path)
            setPosterId(randomMovie.id)
            setMovies(res.data.results);
        })
        .catch(err => console.log(err));

        // get popular movies
        axios.get(requests.fetchPopularMovies)
        .then(res =>{
            const filter = res.data.results.filter((movie)=> movie.genre_ids.includes(parseInt(e.target.value)));
            setPopular(filter)
        }).catch(err => console.log(err));

        // get top rated movies
        axios.get(requests.fetchTopRatedMovies)
        .then(res =>{
            const filter = res.data.results.filter((movie)=> movie.genre_ids.includes(parseInt(e.target.value)));
            setTopRated(filter)
        }).catch(err => console.log(err));
    }

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
        <title>Movies</title>
    </Head>
    <Nav />
    <div className={styles.home}>
        <Poster title={title} description={description} poster={posterImage} genres={genres} getMoviePoster={getMoviePoster} route="movies" id={postId} trailerPath={trailerPath} />
        <Section title="Movies" list={Movies} />
        <Section title="Popular Movies" list={popular} />
        <Section title="Top Rated Movies" list={topRated} />
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

    const response = await axios.get(`${process.env.NEXT_PUBLIC_MDB_URL}/list/${28}?api_key=${process.env.NEXT_PUBLIC_MDB_API_KEY}`);
    const data = await response.data.items;
    const randomMovie = data[Math.floor(Math.random() * data.length - 1)]

    // get genres names
    const genresResponse = await axios.get(requests.fetchGernes);
    const gerensData = await genresResponse.data.genres;

    // get popular Movies
    const popularMoviesRes = await axios.get(`${requests.fetchPopularMovies}`);
    const popularMoviesData = await popularMoviesRes.data.results;

    // get top-rated Movies
    const topRatedMoviesRes = await axios.get(`${requests.fetchTopRatedMovies}`);
    const topRatedMoviesData = await topRatedMoviesRes.data.results;

    return{
        props:{
            genres:gerensData,
            poster:randomMovie,
            selectedMovies:data,
            popularMovies:popularMoviesData,
            topRatedMovies:topRatedMoviesData,
            session
        }
    }
    
}

export default Movies;