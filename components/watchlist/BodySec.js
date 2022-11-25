import styles from "../../styles/watchlist/BodySec.module.css";
import axios from "axios";
import {server} from "../../lib/server";
import { useRouter } from "next/router";
import { useContext } from "react";
import { AppContext } from "../../ContextApi";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

function BodySec({watchlist,searchValue}){
    const baseImgaeUrl = "https://image.tmdb.org/t/p/original"
    const {user} = useContext(AppContext);
    const router = useRouter();

    const deleteMovieHandler =(movieId)=>{
        axios.patch(`${server}/api/watchlist/delete-from-watchlist/${user.name}`,{movieId})
        .then(res => router.reload())
    }

return <div className={styles.body}>
    {watchlist.length > 0 ? watchlist.filter((list)=> list.title.toLowerCase().indexOf(searchValue.toLowerCase()) > -1)
    .map((list,index)=>{
        return <div key={index} className={styles.sec}>
        <div className={styles.poster} onClick={()=> {
            if(list.type === "movie"){
                router.push(`/movies/${list.id}`)
            }else{
                router.push(`/tv/${list.id}`)
            }
        }}>
            <img src={`${baseImgaeUrl}/${list.poster}`} alt="" />
            <div className={styles.score}>
                {list.score}
            </div>
        </div>
        <h2 onClick={()=> {
            if(list.type === "movie"){
                router.push(`/movies/${list.id}`)
            }else{
                router.push(`/tv/${list.id}`)
            }
        }}>{list.title}</h2>
        <span>{list.release_date}</span>
        <div className={styles.control} onClick={()=>deleteMovieHandler(list.id)}>
            <FontAwesomeIcon icon={faTimes} />
        </div>
        </div>
    }) : "You have not added any to your watchlist"}
</div>

}

export default BodySec;