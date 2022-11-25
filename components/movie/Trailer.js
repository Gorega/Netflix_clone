import styles from "../../styles/movie/Trailer.module.css"
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Trailer({closeTrailer,trailerPath,posterPath}){

return <div className={styles.trailer}>
    <div className={styles.body}>
        <div className={styles.head}>
            <h2>Officail Trailer</h2>
            <FontAwesomeIcon icon={faTimes} onClick={closeTrailer} />
        </div>

        <div className={styles.video}>
            <iframe src={`https://www.youtube.com/embed/${trailerPath}`} />
        </div>
    </div>
</div>
}

export default Trailer;