import axios from "axios";
import {useEffect, useState } from "react";
import Poster from "../../components/Poster";
import Section from "../../components/Section";
import Nav from "../../components/Nav";
import { requests } from "../../lib/requests";
import styles from "../../styles/Home.module.css"
import {getSession} from "next-auth/react";
import Head from "next/head";

const MDB_URL = process.env.NEXT_PUBLIC_MDB_URL;
const api_key = process.env.NEXT_PUBLIC_MDB_API_KEY;

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
        axios.get(`${MDB_URL}/discover/movie?with_genres=${e.target.value}&api_key=${api_key}`)
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

    const [selectedMoviesRes,genresRes,popularMoviesRes,topRatedMoviesRes] = await Promise.all([
        axios.get(`${MDB_URL}/list/${28}?api_key=${api_key}`),
        axios.get(requests.fetchGernes),
        axios.get(`${requests.fetchPopularMovies}`),
        axios.get(`${requests.fetchTopRatedMovies}`)
      ]);
  
      const [selectedMovies,genres,popularMovies,topRatedMovies] = await Promise.all([
        selectedMoviesRes.data.items,
        genresRes.data.genres,
        popularMoviesRes.data.results,
        topRatedMoviesRes.data.results
      ]);

    return{
        props:{
            genres:genres,
            poster:selectedMovies[Math.floor(Math.random() * selectedMovies.length - 1)],
            selectedMovies:selectedMovies,
            popularMovies:popularMovies,
            topRatedMovies:topRatedMovies,
            session
        }
    }
    
}

export default Movies;