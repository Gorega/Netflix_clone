import { faFacebook, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../../styles/person/SideSection.module.css";

function SideSection({person,credits,social}){
    const baseImgaeUrl = "https://image.tmdb.org/t/p/original"

return <div className={styles.side}>
    <div className={styles.image}>
        <img src={`${baseImgaeUrl}/${person.profile_path}`} alt="" />
    </div>
    
    <div className={styles.social}>
        <ul>
            <a href={`https://facebook.com/${social.facebook_id}`} target="_blank"><li><FontAwesomeIcon icon={faFacebook} /></li></a>
            <a href={`https://twitter.com/${social.twitter_id}`} target="_blank"><li><FontAwesomeIcon icon={faTwitter} /></li></a>
            <a href={`https://instagram.com/${social.instagram_id}`} target="_blank"><li><FontAwesomeIcon icon={faInstagram} /></li></a>
        </ul>
    </div>

    <div className={styles.info}>
        <h2>Personal Info</h2>
        <div className={styles.sec}>
            <h4>Known For</h4>
            <p>{person.known_for_department}</p>
        </div>
        <div className={styles.sec}>
            <h4>Known Credits</h4>
            <p>{credits.cast.length}</p>
        </div>
        <div className={styles.sec}>
            <h4>Gender</h4>
            <p>{person.gender === 2 ? "Male" : "Female"}</p>
        </div>
        <div className={styles.sec}>
            <h4>Birthday</h4>
            <p>{person.birthday}</p>
        </div>
        <div className={styles.sec}>
            <h4>Place of Birth</h4>
            <p>{person.place_of_birth}</p>
        </div>
        <div className={styles.sec}>
            <h4>Also Known As</h4>
            <ul>
                {person.also_known_as.map((name,index)=>{
                    return <li key={index}>{name}</li>
                })}
            </ul>
        </div>
    </div>
</div>

}

export default SideSection;