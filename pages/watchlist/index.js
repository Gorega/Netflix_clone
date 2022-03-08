import FiltersSec from "../../components/watchlist/FiltersSec";
import BodySec from "../../components/watchlist/BodySec";
import styles from "../../styles/watchlist/WatchlistPage.module.css";
import Nav from "../../components/Nav";
import axios from "axios";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import {server} from "../../lib/server";

function watchlistPage(){
    const [loading,setLoading] = useState(false);
    const [searchValue,setSearchValue] = useState("");
    const [watchList,setWatchList] = useState([]);

    const searchBoxHandler = (e)=>{
        setSearchValue(e.target.value)
    }

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem("user"));
        const fetchWatchList = async ()=>{
            setLoading(true)
            const response = await axios.get(`${server}/api/watchlist/user-watchlist/${user.name}`);
            const data = await response.data.list[0].watchList;
            setWatchList(data)
            setLoading(false)
        }
        fetchWatchList();
    },[])

return <>
<Nav />
<div className={styles.watchlist}>
    <h2>Watch List</h2>
    <div className={styles.content}>
        <div className={styles.filters}>
            <FiltersSec searchBoxHandler={searchBoxHandler} searchValue={searchValue} />
        </div>
        <div className={styles.body}>
            {loading ? <div className={styles.loading}><FontAwesomeIcon className="fa-spin" icon={faSpinner} /></div> : <BodySec watchlist={watchList} searchValue={searchValue} />}
        </div>
    </div>
</div>
</>

}

export default watchlistPage;