import styles from "../../styles/preLogin/Register.module.css";
import logo from "../../public/img/logo.png";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner,faCheck } from '@fortawesome/free-solid-svg-icons'
import {server} from "../../lib/server";

function Register(){
    const router = useRouter();
    const [emailValue,setEmailValue] = useState(null);
    const [passValue,setPassValue] = useState(null);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);
    const [successStatus,setSuccessStatus] = useState(false);

    const registerHandler = (e)=>{
        e.preventDefault();
        setLoading(true)
        axios.post(`${server}/api/auth/register`,{email:emailValue,password:passValue})
        .then(res => {
            setLoading(false)
            setSuccessStatus(true)
            router.replace("/login")
        })
        .catch(err => {
            setLoading(false)
            setSuccessStatus(false)
            setError(err.response.data.msg)
        });
    }

return <div className={styles.main}>
        <div className={styles.overlay}></div>
    <div className={styles.head}>
        <div className={styles.logo}>
            <img src={logo.src} alt="" />
        </div>
        <div className={styles.login}>
            <button onClick={()=> router.push("/login")}>Sign In</button>
        </div>
    </div>

    <div className={styles.body}>
        <h1>Unlimited movies, TV shows, and more.</h1>
        <span>Watch anywhere. Cancel anytime.</span>
        <p>Ready to watch? Enter your email to create or restart your membership.</p>
        <form onSubmit={registerHandler}>
            <input type="email" placeholder="Email Address" value={emailValue} onChange={(e)=> setEmailValue(e.target.value)} />
            <input type="password" placeholder="Add a password" value={passValue} onChange={(e)=> setPassValue(e.target.value)} />
            <button>{loading ? <FontAwesomeIcon icon={faSpinner} className="fa-spin" /> : successStatus ? <FontAwesomeIcon icon={faCheck} /> : "Get Started"}</button>
        </form>
        {error && <div className={styles.error}>
            {error}
        </div>}
    </div>

</div>

}

export default Register;