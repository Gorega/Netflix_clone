import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown,faCaretRight } from '@fortawesome/free-solid-svg-icons'
import styles from "../../styles/watchlist/FiltersSec.module.css";
import { useState } from 'react';

function FiltersSec({searchBoxHandler,searchValue}){
    const [showSearchBody,setShowSearchBody] = useState(false);

return <div className={styles.filters}>
    <div className={styles.sec}>
        <div className={styles.head} onClick={()=> setShowSearchBody(!showSearchBody)}>
            <h2>Search</h2>
            <span><FontAwesomeIcon icon={showSearchBody ? faCaretDown : faCaretRight} /></span>
        </div>
        <div className={`${styles.body} ${showSearchBody && styles.show}`}>
            <input type="search" placeholder='Search' value={searchValue} onChange={searchBoxHandler} />
        </div>
    </div>

    <div className={styles.sec}>
        <div className={styles.head}>
            <h2>Filters</h2>
            <span><FontAwesomeIcon icon={faCaretRight} /></span>
        </div>
    </div>

</div>

}

export default FiltersSec;