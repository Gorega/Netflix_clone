import styles from "../styles/Poster.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay,faInfo } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from "next/router";
import { useState } from "react";
import Trailer from "../components/movie/Trailer";

function Poster({title,description,poster,genres,getMoviePoster,route,id}){
    const baseImgaeUrl = "https://image.tmdb.org/t/p/original"
    const [playMovie,setPlayMovie] = useState(false);
    const router = useRouter();

return <div className={styles.poster} style={{backgroundImage:`url(${baseImgaeUrl}/${poster})`}}>
        <div className={styles.overlay}></div>
        {genres && <div className={styles.genre}>
        Genre
        <select onChange={getMoviePoster}>
            {genres.map((genre,index)=>{
                return <option key={index} value={genre.id}>{genre.name}</option>
            })}
        </select>
    </div>}
    <div className={styles.content}>
        <div className={styles.title}>
            {title}
        </div>
        <div className={styles.button}>
            <button onClick={()=> setPlayMovie(true)}><FontAwesomeIcon icon={faPlay} /> Play</button>
            <button onClick={()=> router.push(`/${route}/${id}`)}><FontAwesomeIcon icon={faInfo} /> Info</button>
        </div>
        <div className={styles.description}>
            {description}
        </div>
    </div>

    {playMovie && <Trailer closeTrailer={()=> setPlayMovie(false)} trailerPath={""} posterPath={poster} />}
</div>

}

export default Poster;