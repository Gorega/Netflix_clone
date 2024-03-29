import styles from "../styles/Section.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft,faAngleRight } from '@fortawesome/free-solid-svg-icons'
import {useLayoutEffect, useRef, useState} from "react";
import {useRouter} from "next/router"

function Section({title,list,route}){

    const baseImgaeUrl = "https://image.tmdb.org/t/p/original"
    let scrollAmount = 250;
    let listRefWidth;
    const listRef = useRef();
    const router = useRouter();
    const [showControl,setShowControl] = useState(false);
    const [pageWidth,setPageWidth] = useState(null);

    const scrollRight = ()=>{
        listRef.current.scrollBy({
            left: ++scrollAmount,
            behavior:"smooth"
        })
    }

    const scrollLeft = ()=>{
        listRef.current.scrollBy({
            left: -scrollAmount,
            behavior:"smooth"
        })
    }

    useLayoutEffect(()=>{
        listRefWidth = listRef.current.scrollWidth;        
        setPageWidth(window.innerWidth);
        if(listRefWidth > pageWidth){
            setShowControl(true)
        }else{
            setShowControl(false)
        }
    },[pageWidth])

return <div className={styles.section}>
    <div className={styles.title}>
        {title}
    </div>
    <div className={styles.list} ref={listRef}>
        {list.length > 0 ? list.map((movie,index)=>{
            return <div className={styles.movie} key={index} onClick={()=>{
                router.push(`/${route ? route : "movies"}/${movie.id}`)
            }}>
            <img src={`${baseImgaeUrl}/${movie.poster_path}`} alt=""/>
            <h2>{movie.title || movie.name}</h2>
            </div>
        }) : <div style={{fontSize:13,marginLeft:10}}>No movies to show ...</div>}
        {showControl && list.length >= 7 && <div className={styles.control}>
                <span onClick={scrollLeft}><FontAwesomeIcon icon={faAngleLeft} /></span>
                <span onClick={scrollRight}><FontAwesomeIcon icon={faAngleRight} /></span>
        </div>}
    </div>
</div>

}

export default Section;