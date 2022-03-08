import styles from "../../styles/movie/MovieBodySide.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook,faTwitter,faInstagram } from '@fortawesome/free-brands-svg-icons'

function MovieBodySide({movie,keyword,social}){
return <div className={styles.side}>
    <div className={styles.social}>
        <ul>
            <a href={`http://facebook.com/${social.facebook_id}`} rel="noreferrer" target="_blank"><li><FontAwesomeIcon icon={faFacebook} /></li></a>
            <a href={`http://twitter.com/${social.twitter_id}`} rel="noreferrer" target="_blank"><li><FontAwesomeIcon icon={faTwitter} /></li></a>
            <a href={`http://instagram.com/${social.instagram_id}`} rel="noreferrer" target="_blank"><li><FontAwesomeIcon icon={faInstagram} /></li></a>
        </ul>
    </div>

    <div className={styles.details}>
        <div className={styles.sec}>
            <h3>Status</h3>
            <p>{movie.status}</p>
        </div>
        <div className={styles.sec}>
            <h3>Origianl Language</h3>
            <p>{movie.spoken_languages[0] && movie.spoken_languages[0].name}</p>
        </div>
        <div className={styles.sec}>
            <h3>Budget</h3>
            <p>{movie.budget ? movie.budget.toLocaleString() : "-"}</p>
        </div>
        <div className={styles.sec}>
            <h3>Revenue</h3>
            <p>{movie.revenue ? movie.revenue.toLocaleString() : "-"}</p>
        </div>
        <div className={styles.sec}>
            <h3>Keywords</h3>
            <ul>
                {keyword.results && keyword.results.length > 0 ? keyword.results.map((keyword,index)=>{
                    return <li key={index}>{keyword.name}</li>
                }) : "-" || keyword.keywords && keyword.keywords.length > 0 ? keyword.keywords.map((keyword,index)=>{
                    return <li key={index}>{keyword.name}</li>
                }) : "-"}
            </ul>
        </div>
    </div>


</div>

}

export default MovieBodySide;