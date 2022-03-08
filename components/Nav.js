import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortDown,faMagnifyingGlass,faBars } from '@fortawesome/free-solid-svg-icons'
import styles from "../styles/Nav.module.css"
import logo from "../public/img/logo.png"
import Link from "next/link"
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../ContextApi';
import SideBar from './SideBar'
import axios from 'axios'

function Nav(){
    const router = useRouter();
    const {user,setShowSideBar} = useContext(AppContext);
    const [sugg,setSugg] = useState([]);
    const [searchValue,setSearchValue] = useState(null);

    const searchFilter = (e)=>{
        setSearchValue(e.target.value)
        axios.get(`${process.env.NEXT_PUBLIC_MDB_URL}/search/movie?api_key=${process.env.NEXT_PUBLIC_MDB_API_KEY}&query=${searchValue}`)
        .then(res => setSugg(res.data.results))
        .catch(err => console.log(err));
    }

    const navLinks = [{
        title:"Home",
        to:"/dashboard",
    },
    {
        title:"Movies",
        to:"/movies"
    },
    {
        title:"Kids",
        to:"/kids"
    },
    {
        title:"TV Shows",
        to:"/tv"
    },
    {
        title:"People",
        to:"/people"
    },{
        title:"WatchList",
        to:"/watchlist"
    }]

    useEffect(()=>{
        window.addEventListener("click",(e)=>{
            if(!e.target.classList.contains(`${styles.searchBox} ${styles.searchSugg}`)){
                setSearchValue(null)
            }
        })
    },[])


return <div className={styles.navbar}>
<div className={styles.logo} onClick={()=> router.push("/dashboard")}>
    <img src={logo.src} alt="" />
</div>
<div className={styles.list}>
    <ul>
       {navLinks.map((link,index)=>{
           return <Link key={index} href={link.to}><li className={`${router.pathname === link.to && styles.active}`}>{link.title}</li></Link>
        })}
    </ul>
</div>
<div className={styles.end}>
    <div className={styles.searchBox}>
        <input type="search" placeholder="Search for a movie,tv show,person....." value={searchValue} onChange={searchFilter} />
        {(sugg?.length > 0 && searchValue) && <div className={styles.searchSugg}>
            <ul>
                {sugg.slice(0,10).map((li,index)=>{
                    return <li key={index} onClick={()=>{
                        if(li.media_type === "tv"){
                            router.push(`/tv/${li.id}`)
                            setSearchValue(null)
                        }else{
                            router.push(`/movies/${li.id}`)
                            setSearchValue(null)
                        }
                    }}><FontAwesomeIcon icon={faMagnifyingGlass} /> {li.title}</li>
                })}
            </ul>
        </div>}
    </div>
    <div className={styles.account} onClick={()=> setShowSideBar(true)}>
        <img src={user && user.image} alt="" />
        <span><FontAwesomeIcon icon={faSortDown} /></span>
    </div>
    <div className={styles.bar} onClick={()=> setShowSideBar(true)}>
        <FontAwesomeIcon icon={faBars} />
    </div>
</div>

<SideBar />
</div>

}

export default Nav;