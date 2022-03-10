import styles from "../styles/SideBar.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay,faBarsStaggered,faMagnifyingGlass,faUserAlt,faTv,faClapperboard,faPlus } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from "next/router";
import { useContext,useEffect } from "react";
import {AppContext} from "../ContextApi";
import {signOut} from "next-auth/react";

function SideBar(){
    const router = useRouter();
    const {user,showSideBar,setShowSideBar} = useContext(AppContext);

    const Navigate = (route)=>{
        router.push(route)
        setShowSideBar(false)
    }

    useEffect(()=>{
        window.addEventListener("mouseup",(e)=>{
            if(e.target.classList.contains(styles.sideBar)){
                setShowSideBar(false)
            }
        })
        if(showSideBar){
            document.body.style.overflow = "hidden"
        }else{
            document.body.style.overflow = "auto"
        }
    },[showSideBar])

return <div className={`${styles.sideBar} ${showSideBar && styles.show}`}>
    <div className={styles.content}>
        <div className={styles.head}>
            <div className={styles.profileImg}>
                <img src={user ? user.image : ""} alt="" />
            </div>
            <div className={styles.info}>
                <h3>{user ? user.name : ""}</h3>
                <span onClick={()=> router.push("/profile")}>Switch Profiles</span>
            </div>
        </div>

        <div className={styles.list}>
            <ul>
                <li onClick={()=>setShowSideBar(false)}><FontAwesomeIcon icon={faPlay}/> Watch Now</li>
                <li><FontAwesomeIcon icon={faBarsStaggered}/> Browse</li>
                <li><FontAwesomeIcon icon={faMagnifyingGlass}/> Search</li>
                <li onClick={()=> Navigate("/movies")}><FontAwesomeIcon icon={faClapperboard}/> Movies</li>
                <li onClick={()=> Navigate("/tv")}><FontAwesomeIcon icon={faTv}/> TV Shows</li>
                <li onClick={()=> Navigate("/people")}><FontAwesomeIcon icon={faUserAlt}/> People</li>
                <li onClick={()=> Navigate("/watchlist")}><FontAwesomeIcon icon={faPlus}/> My List</li>
            </ul>
        </div>

        <div className={styles.end}>
            <ul>
                <li>Settings</li>
                <li onClick={()=> {
                    window.localStorage.removeItem("user")
                    signOut()
                }}>Sign Out</li>
            </ul>
        </div>
    </div>
</div>

}

export default SideBar;