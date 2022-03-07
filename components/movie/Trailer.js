import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../../styles/movie/Trailer.module.css"

function Trailer({closeTrailer,trailerPath,posterPath}){
return <div className={styles.trailer}>
    <div className={styles.body}>
        <div className={styles.head}>
            <h2>Officail Trailer</h2>
            <FontAwesomeIcon icon={faTimes} onClick={closeTrailer} />
        </div>

        <div className={styles.video}>
            <video src={`https://www.youtube.com/watch/${trailerPath}`} poster={`https://image.tmdb.org/t/p/original/${posterPath}`} controls />
        </div>
    </div>
</div>
}

export default Trailer;