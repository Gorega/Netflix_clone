import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus,faEdit,faTrash } from '@fortawesome/free-solid-svg-icons'
import styles from "../../styles/profile/ProfileFace.module.css";
import { useRouter } from "next/router";
import axios from "axios";
import {server} from "../../lib/server";
import { useState,useEffect } from "react";

function ProfileFace({profiles}){
    const router = useRouter();
    const [error,setError] = useState({status:false,msg:""})

    const deleteProfileHandler = (profileName)=>{
        axios.patch(`${server}/api/profile/delete-user/${profileName}`)
        .then(res => window.location.reload())
        .catch(err => console.log(err))
    }

    useEffect(()=>{
        const timer = setTimeout(()=>{
            setError({status:false})
        },3000)
        return(()=>{
            window.clearTimeout(timer);
        })
    },[error])

    
return <div className={styles.users}>
    <h2>Who Watching Netflix?</h2>
    <div className={styles.list}>
        <div className={styles.sec} onClick={()=>{
            if(profiles.length >= 4){
                setError({status:true,msg:"You have reached the maximum profiles, you can't add more"})
            }else{
                router.push("/profile/create")
            }
        }}>
            <div className={styles.image}>
                <FontAwesomeIcon icon={faPlus} />
            </div>
            <h3>Add New User</h3>
        </div>
        {profiles.map((user,index)=>{
            return <div key={index} className={styles.sec}>
            <img src={user.image} alt="" onClick={()=>{
                localStorage.setItem("user",JSON.stringify(user))
                window.location.href = "/dashboard"
            }} />
            <h3 onClick={()=>{
                localStorage.setItem("user",JSON.stringify(user))
                window.location.href = "/dashboard"
            }}>{user.name}</h3>
            <div className={styles.control}>
                <ul>
                    <li onClick={()=> deleteProfileHandler(user.name)}><FontAwesomeIcon icon={faTrash} /></li>
                    <li onClick={()=> router.push(`/profile/edit/${user.name}`)}><FontAwesomeIcon icon={faEdit} /></li>
                </ul>
            </div>
            </div>
        })}
    </div>
    {error.status && <div className={styles.error}>{error.msg}</div>}
</div>

}

export default ProfileFace;