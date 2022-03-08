import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import styles from "../../styles/movie/MovieBody.module.css";
import MovieBodySide from "./MovieBodySide";

function MovieBody({credits,reviews,movie,videos,media,keywords,social,recommendation,route}){

    const baseImgaeUrl = "https://image.tmdb.org/t/p/original"
    const avaterImageUrl = "https://www.themoviedb.org/u";
    const baseVideoUrl = "https://www.youtube.com/watch"
    const [socialSwitch,setSocialSwitch] = useState(0);
    const [mediaSwitch,setMediaSwitch] = useState(0);
    const [showReviewContent,setShowReviewContent] = useState(false);
    const router = useRouter();

return <div className={styles.main}>
    <div className={styles.leftSec}>
        <div className={styles.cast}>
            <h2>Top Billed Cast</h2>
            <div className={styles.list}>
                {credits.cast.map((credit,index)=>{
                    return <div key={index} className={styles.sec}>
                    <img onClick={()=> router.push(`/people/${credit.id}`)} src={`${baseImgaeUrl}/${credit.profile_path}`} alt="" />
                    <h2 onClick={()=> router.push(`/people/${credit.id}`)}>{credit.name}</h2>
                    </div>
                })}
            </div>
        </div>

        <div className={styles.social}>
            <div className={styles.head}>
                <h2>Social</h2>
                <ul>
                    <li onClick={()=> setSocialSwitch(0)} className={socialSwitch === 0 && styles.active}>Reviews</li>
                    <li onClick={()=> setSocialSwitch(1)} className={socialSwitch === 1 && styles.active}>Disscussion</li>
                </ul>
            </div>
            {socialSwitch === 0 ? reviews ? <div className={styles.in}>
                <div className={styles.user}>
                    <div className={styles.profile_img}>
                        <img src={`${avaterImageUrl}/${reviews.avatar_path}`} alt="" />
                    </div>
                    <div className={styles.info}>
                        <h2>A review by {reviews.author}</h2>
                        <p>Written by <span>{reviews.author}</span> on December 15,2021</p>
                    </div>
                </div>
                <div className={styles.desc} onClick={()=> setShowReviewContent(!showReviewContent)}>
                    {showReviewContent ? reviews.content : `${reviews.content.substring(0,650)} ...`}
                </div>
            </div> : <div className={styles.in}>We dont have any reviews for {movie.title}. Would you like to write one?</div> : ""}
        </div>

        <div className={styles.media}>
            <div className={styles.head}>
                    <h2>Media</h2>
                    <ul>
                        <li onClick={()=> setMediaSwitch(0)} className={mediaSwitch === 0 && styles.active}>Videos</li>
                        <li onClick={()=> setMediaSwitch(1)} className={mediaSwitch === 1 && styles.active}>Backdrops</li>
                        <li onClick={()=> setMediaSwitch(2)} className={mediaSwitch === 2 && styles.active}>Posters</li>
                    </ul>
                </div>

            <div className={styles.in}>
                <div className={styles.list}>
                    {mediaSwitch === 0 && videos.results.slice(0,3).map((video,index)=>{
                        return <div key={index} className={styles.sec}>
                        <video src={`${baseVideoUrl}/${video.key}`} alt="" autoPlay="off" controls poster={`${baseImgaeUrl}/${movie.backdrop_path}`} />
                    </div>
                    })}
                    {mediaSwitch === 1 && media.backdrops.map((media,index)=>{
                        return <div key={index} className={styles.sec}>
                        <img src={`${baseImgaeUrl}/${media.file_path}`} alt="" />
                    </div>
                    })}
                    {mediaSwitch === 2 && media.posters.map((media,index)=>{
                        return <div key={index} className={`${styles.sec && styles.posters}`}>
                        <img src={`${baseImgaeUrl}/${media.file_path}`} alt="" />
                    </div>
                    })}
                </div>
            </div>
        </div>

        <div className={styles.recommended}>
            <h2>Recommendations</h2>
            <div className={styles.list}>
                {recommendation.map((movie,index)=>{
                    return <div key={index} className={styles.sec}>
                    <img onClick={()=> router.push(`/${route}/${movie.id}`)} src={`${baseImgaeUrl}/${movie.poster_path}`} alt="" />
                    <h4 onClick={()=> router.push(`/${route}/${movie.id}`)}>{movie.title || movie.name}</h4>
                    </div>
                })}
            </div>
        </div>
    </div>

    <div className={styles.rightSec}>
        <MovieBodySide movie={{...movie}} keyword={keywords} social={{...social}}
        />
    </div>
    
                
</div>

}

export default MovieBody;