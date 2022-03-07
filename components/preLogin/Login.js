import styles from "../../styles/preLogin/Login.module.css";
import logo from "../../public/img/logo.png";
import { useRouter } from "next/router";
import { useState } from "react";
import { signIn } from "next-auth/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner,faCheck } from '@fortawesome/free-solid-svg-icons'

function Login(){
    const router = useRouter();
    const [emailInput,setEmailInput] = useState(null);
    const [passwordInput,setPasswordInput] = useState(null);
    const [loading,setLoading] = useState(false);
    const [done,setDone] = useState(null)
    const [error,setError] = useState(null);

    const loginHandler = async (e)=>{
        setLoading(true)
        e.preventDefault();
        const result = await signIn("credentials",{
            redirect:false,
            email:emailInput,
            password:passwordInput
        })
        if(result.error){
            setDone(false)
            setLoading(false);
            setError(result.error);
        }
        if(!result.error){
            setDone(true)
            setLoading(false)
            router.replace("/profile");
        }
    }

return <div className={styles.login}>
        <div className={styles.overlay}></div>
    <div className={styles.head}>
        <img src={logo.src} alt="" />
    </div>
    <div className={styles.body}>
        <h2>Sign In</h2>
        <form onSubmit={loginHandler}>
            {error && <div className={styles.error}>
                {error}
            </div>}
            <div className={styles.inputBox}>
                <input type="email" placeholder="Email Address" value={emailInput} onChange={(e)=> setEmailInput(e.target.value)} />
            </div>
            <div className={styles.inputBox}>
                <input type="password" placeholder="********" value={passwordInput} onChange={(e)=> setPasswordInput(e.target.value)} />
            </div>
            <button>{loading ? <FontAwesomeIcon className="fa-spin" icon={faSpinner} /> : done ? <FontAwesomeIcon icon={faCheck} /> : "Sign In"  }</button>
            <div className={styles.in}>
                <div className={styles.remember}>
                    <input type="checkbox" />
                    <label>Remember me</label>
                </div>
                <div className={styles.help}>
                    Need help?
                </div>
            </div>
        </form>

        <div className={styles.new}>
            <h4>New to Netflix? <span onClick={()=> router.push("/")}>Sign up now</span></h4>
        </div>
    </div>
</div>

}

export default Login;