import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark,faHeart,faStar,faPlay,faSpinner } from '@fortawesome/free-solid-svg-icons'
import Trailer from "./Trailer";
import styles from "../../styles/movie/Header.module.css";
import {useState,useContext, useEffect} from "react"; 
import Nav from "../Nav";
import { AppContext } from "../../ContextApi";
import {server} from "../../lib/server"
import axios from "axios";
import { makeStyles } from '@mui/styles';
import Rating from '@mui/material/Rating';

const useStyles = makeStyles({
    root:{
       "& .MuiRating-label":{
           color:"green",
           fontSize:40,
       }
    }
})

function Header({movie,credits,trailer}){
    const classes = useStyles();
    const baseImgaeUrl = "https://image.tmdb.org/t/p/original"
    const [showTrailer,setShowTrailer] = useState(false);
    const [listedLoading,setListedLoading] = useState(false);
    const [listed,setListed] = useState({
        status:false,
        msg:"",
        error:false
    })
    const {user} = useContext(AppContext);

    const addToWatchListHandler = ()=>{
        setListedLoading(true)
        axios.post(`${server}/api/watchlist/add-to-watchlist/${user.name}`,{list:{
            id:movie.id,
            poster:movie.poster_path,
            title:movie.title || movie.name,
            release_date:movie.release_date || movie.first_air_date,
            score:movie.vote_average,
            type:window.location.pathname.includes("movies") ? "movie" : "tv"
        }})
        .then(res=> {
            setListedLoading(false)
            setListed({status:true,msg:"Added to WatchList"})
        })
        .catch(err => {
            setListedLoading(false)
            setListed({status:true,msg:"Failed to add, please try again",error:true})
        });
    }

    useEffect(()=>{
        const timer = window.setTimeout(()=>{
            setListed({status:false})
        },3000)
        return(()=>{
            window.clearTimeout(timer)
        })
    },[listed])

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
                        {listedLoading ? <FontAwesomeIcon style={{marginLeft:-7,marginTop:-7}} className='fa-spin' icon={faSpinner} /> : <FontAwesomeIcon icon={faBookmark} />}
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
                        {/* <div className={styles.rate}>
                        </div> */}
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
    <div className={`${styles.notification} ${listed.status && styles.show}`} style={{backgroundColor:listed.error ? "darkred" : "green"}}>{listed.msg}</div>
    {showTrailer && <Trailer closeTrailer={()=> setShowTrailer(false)} trailerPath={trailer.key} posterPath={movie.poster_path} />}
</div>
</>

}

export default Header;