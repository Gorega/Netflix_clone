import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../../styles/person/MainSection.module.css";

function MainSection({person,credits}){
    const [showBio,setShowBio] = useState(false);
    const [selectFilterValue,setSelectFilterValue] = useState(null);
    const [filteredCredits,setFilteredCredits] = useState([]);
    const baseImgaeUrl = "https://image.tmdb.org/t/p/original"
    const router = useRouter();

    const selectFilterHandler = (e)=>{
        setSelectFilterValue(e.target.value)
        const filter = credits.cast.filter((credit)=> credit.media_type === e.target.value);
        setFilteredCredits(filter)
    }

    useEffect(()=>{

    },[selectFilterValue])

return <div className={styles.main}>
    <h2>{person.name}</h2>

    <div className={styles.bio}>
        <h3>Biography</h3>
        <p onClick={()=> setShowBio(!showBio)}>{showBio ? person.biography : `${person.biography.substring(0,600)} ...`}</p>
    </div>

    <div className={styles.knownFor}>
        <h3>Known For</h3>
        <div className={styles.list}>
            {credits.cast.slice(0,15).map((credit,index)=>{
                return <div key={index} className={styles.sec}>
                <img onClick={()=> credit.media_type === "tv" ? router.push(`/tv/${credit.id}`) : router.push(`/movies/${credit.id}`)} src={`${baseImgaeUrl}/${credit.poster_path}`} alt="" />
                <h4 onClick={()=> credit.media_type === "tv" ? router.push(`/tv/${credit.id}`) : router.push(`/movies/${credit.id}`)} src={`${baseImgaeUrl}/${credit.poster_path}`}>{credit.name || credit.title}</h4>
                </div>
            })}
        </div>
    </div>

    <div className={styles.acting}>
        <div className={styles.head}>
            <h3>Acting</h3>
            <select onChange={selectFilterHandler}>
                <option value="">All</option>
                <option value="movie">Movies</option>
                <option value="tv">TV Shows</option>
            </select>
        </div>

        <div className={styles.content}>
            {filteredCredits.length > 0 ? filteredCredits.slice(0,10).map((credit,index)=>{
                return <div key={index} className={styles.sec}>
                <div className={styles.in}>
                   <h4>{credit.release_date || credit.first_air_date}</h4>
                </div>
                <div className={styles.in}>
                   <span></span>
               </div>
               <div className={styles.in}>
                   <p>{credit.title || credit.name} as {credit.character}</p>
                </div>
                </div>
            }) : credits.cast.map((credit,index)=>{
                return <div key={index} className={styles.sec}>
                         <div className={styles.in}>
                            <h4>{credit.release_date || credit.first_air_date}</h4>
                         </div>
                         <div className={styles.in}>
                            <span></span>
                        </div>
                        <div className={styles.in}>
                            <p>{credit.title || credit.name} as {credit.character}</p>
                         </div>
                    </div>
            })}
        </div>
    </div>

</div>

}

export default MainSection;