import Poster from "../../components/Poster";
import Section from "../../components/Section";
import Nav from "../../components/Nav"
import styles from "../../styles/Home.module.css";
import axios from "axios";
import { requests } from "../../lib/requests";
import { getSession } from "next-auth/react";

export default function Home({poster,moviesList,tvLists,playingNow}) {
  
  return <>
  <Nav />
  <div className={styles.home}>
    <Poster title={poster.title} description={poster.overview} poster={poster.backdrop_path} route="movies" id={poster.id} />
    <Section title="Now Playing" list={playingNow}  />
    <Section title="Movies" list={moviesList}  />
    <Section title="TV Shows" list={tvLists} route={"tv"}  />
  </div>
  </>
}

export async function getServerSideProps(context){

    const session = await getSession({req : context.req})

    if(!session){
      return {
        redirect:{
          destination:"/login",
          permanent:false
        }
      }
    }

    // getNowPlayingMovies
    const Response = await axios.get(requests.fetchNowPlayingMovies);
    const data = await Response.data.results;

    // getMoviesList
    const moviesResponse = await axios.get(requests.fetchDiscoverMovies);
    const moviesList = await moviesResponse.data.results;
    const getRandomMovie = moviesList[Math.floor(Math.random() * moviesList.length - 1)];

    // getTVShowsList
    const tvResponse = await axios.get(requests.fetchDiscoverTv);
    const tvLists = await tvResponse.data.results;

  return {
    props:{
      poster:getRandomMovie,
      playingNow:data,
      moviesList:moviesList,
      tvLists:tvLists,
      session:session
    }
  }
}