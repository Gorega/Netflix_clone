import styles from "../../styles/Home.module.css";
import axios from "axios";
import { requests } from "../../lib/requests";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Poster from "../../components/Poster";
import Section from "../../components/Section";
import Nav from "../../components/Nav"

export default function Home({poster,moviesList,tvLists,playingNow}) {
  
  const [trailerPath,setTrailerPath] = useState([]);

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
  <Nav />
  <div className={styles.home}>
    <Poster title={poster.title} description={poster.overview} poster={poster.backdrop_path} route="movies" id={poster.id} trailerPath={trailerPath} />
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

    const [nowPlayingMoviesRes,moviesListRes,tvShowsListRes] = await Promise.all([
      axios.get(requests.fetchNowPlayingMovies),
      axios.get(requests.fetchDiscoverMovies),
      axios.get(requests.fetchDiscoverTv)
    ]);

    const [nowPlayingMovies,moviesList,tvShowList] = await Promise.all([
      nowPlayingMoviesRes.data.results,
      moviesListRes.data.results,
      tvShowsListRes.data.results
    ]);

    return {
      props:{
        poster:moviesList[Math.floor(Math.random() * moviesList.length - 1)],
        playingNow:nowPlayingMovies,
        moviesList:moviesList,
        tvLists:tvShowList,
      }
    }

}
