import styles from "../../styles/person/PersonCard.module.css";
import {useRouter} from "next/router"

function PersonCard({profile_img,profile_name,known_for,profile_id}){

    const baseImgaeUrl = "https://image.tmdb.org/t/p/original"
    const router = useRouter();

return <div className={styles.main}>
    <div className={styles.body}>
        <img src={`${baseImgaeUrl}/${profile_img}`} onClick={()=> router.push(`/people/${profile_id}`)} alt="" />
        <h2 onClick={()=> router.push(`/people/${profile_id}`)}>{profile_name}</h2>
        <p>{known_for}</p>
    </div>
</div>

}

export default PersonCard;