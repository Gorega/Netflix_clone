import styles from "../../styles/profile/ProfileFace.module.css";
import axios from "axios";
import {server} from "../../lib/server"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit,faTrash } from '@fortawesome/free-solid-svg-icons'
import {useEffect, useState} from "react";
import { useRouter } from "next/router";

function Control({user}){

    const [showSmControl,setShowSmControl] = useState(false);
    const router = useRouter();
    const deleteProfileHandler = (profileName)=>{
        axios.patch(`${server}/api/profile/delete-user/${profileName}`)
        .then(_ => window.location.reload())
    }

    useEffect(()=>{
        window.addEventListener("mouseup",(e)=>{
            if(!e.target.classList.contains(styles.control)){
                setShowSmControl(false)
            }
        })
    },[])

return <div className={styles.control}>
    <div className={styles.head} onClick={()=> setShowSmControl(true)}>...</div>
    <ul className={showSmControl && styles.show}>
        <li onClick={()=> deleteProfileHandler(user.name)}><FontAwesomeIcon icon={faTrash} /></li>
        <li onClick={()=> router.push(`/profile/edit/${user.name}`)}><FontAwesomeIcon icon={faEdit} /></li>
    </ul>
</div>

}

export default Control;