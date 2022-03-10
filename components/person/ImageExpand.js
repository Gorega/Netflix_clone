import styles from "../../styles/person/ImageExpand.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

function ImageExpand({person,closeImageExpand}){
    const baseImgaeUrl = "https://image.tmdb.org/t/p/original"

return <div className={styles.expand}>
    <div className={styles.content}>
        <div className={styles.image}>
            <img src={`${baseImgaeUrl}/${person.profile_path}`} alt="" />
        </div>
        <div className={styles.info}>
            <h2>Info</h2>
            <div className={styles.sec}>
                <h4>Name</h4>
                <pre>{person.name}</pre>
            </div>

            <div className={styles.sec}>
                <h4>Gender</h4>
                <pre>{person.gender === 2 ? "Male" : "Female"}</pre>
            </div>
        </div>

        <div className={styles.close} onClick={closeImageExpand}><FontAwesomeIcon icon={faTimes} /></div>
    </div>
</div>

}

export default ImageExpand;