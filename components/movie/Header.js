import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark,faHeart,faStar,faPlay } from '@fortawesome/free-solid-svg-icons'
import Trailer from "./Trailer";
import styles from "../../styles/movie/Header.module.css";
import {useState,useContext, useEffect} from "react"; 
import Nav from "../Nav";
import { AppContext } from "../../ContextApi";
import axios from "axios";
import { useRouter } from "next/router";

function Header({movie,credits,trailer}){
    const baseImgaeUrl = "https://image.tmdb.org/t/p/original"
    const [showTrailer,setShowTrailer] = useState(false);
    const [listed,setListed] = useState({
        status:false,
        msg:""
    })
    const {user} = useContext(AppContext);
    const router = useRouter();

    const addToWatchListHandler = ()=>{
        axios.post(`http://localhost:3000/api/watchlist/add-to-watchlist/${user.name}`,{list:{
            id:movie.id,
            poster:movie.poster_path,
            title:movie.title || movie.name,
            release_date:movie.release_date || movie.first_air_date,
            score:movie.vote_average
        }})
        .then(res=> setListed({status:true,msg:"Added to WatchList"}))
        .catch(err => console.log(err));
    }

    useEffect(()=>{
        const timer = window.setTimeout(()=>{
            setListed({status:false})
        },3000)
        return(()=>{
            window.clearTimeout(timer)
        })
    },[])

return <>
<Nav />
<div className={styles.header} style={{backgroundImage:`url(${baseImgaeUrl}/${movie.backdrop_path})`}}>
        <div className={styles.overlay}></div>
    <div className={styles.content}>
        <div className={styles.poster}>
            <img src={`${baseImgaeUrl}/${movie.poster_path}`} alt="" />
        </div>
        <div className={styles.info}>
            <h2>{movie.title || movie.name}</h2> <span>({movie.release_date?.substring(0,4) || movie.first_air_date?.substring(0,4)})</span>

            <p>{movie.release_date || movie.first_air_date} ({movie.production_countries[0] && movie.production_countries[0].iso_3166_1}) . {movie.genres.map((genre,index)=>{
                return <div className={styles.genre} key={index}>{genre.name}</div>
            })} . {movie.duration}</p>

            <div className={styles.control}>
                <div className={styles.score}>
                    <h5><span>{movie.vote_average}</span></h5><span>User Score</span>
                </div>
                <ul>
                    <li onClick={addToWatchListHandler}>
                        <FontAwesomeIcon icon={faBookmark} />
                        <div className={styles.patch}>
                            Add To WatchList
                        </div>
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faHeart} />
                        <div className={styles.patch}>
                            Favorate
                        </div>
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faStar} />
                        <div className={styles.patch}>
                            Rate
                        </div>
                    </li>
                </ul>
                <div className={styles.trailer} onClick={()=> setShowTrailer(true)}>
                    <FontAwesomeIcon icon={faPlay} /> Play Trailer
                </div>
            </div>

            <div className={styles.overview}>
                <h3>Overview</h3>
                <p>{movie.overview}</p>
            </div>
            <div className={styles.participants}>
                {credits.cast.slice(0,8).map((credit,index)=>{
                    return <div className={styles.sec} key={index}>
                    <h4>{credit.name}</h4>
                    <span>{credit.character}</span>
                    </div>
                })}
            </div>
        </div>
    </div>
    <div className={`${styles.notification} ${listed.status && styles.show}`}>{listed.msg}</div>
    {showTrailer && <Trailer closeTrailer={()=> setShowTrailer(false)} trailerPath={trailer.key} posterPath={movie.poster_path} />}
</div>
</>

}

export default Header;