import styles from "../../styles/profile/Layout.module.css";

function Layout({title,text,imageFile,uploadProfileImage,setProfileName,createProfileHandler,cancelHandler,profileName,namePlaceholder}){
return <div className={styles.main}>
<div className={styles.body}>
    <h2>{title}</h2>
    <p>{text}</p>

    <div className={styles.control}>
        <div className={styles.image}>
            <img src={imageFile} alt="" />
            <div className={styles.upload}>
                <label htmlFor="upload">Choose Profile Picture</label>
                <input type="file" id="upload" style={{display:"none"}} onChange={uploadProfileImage} />
            </div>
        </div>
        <input type="text" placeholder={namePlaceholder} value={profileName} onChange={setProfileName} />
    </div>

    <div className={styles.submit}>
        <button onClick={createProfileHandler}>Continue</button>
        <button onClick={cancelHandler}>Cancel</button>
    </div>
</div>
</div>

}

export default Layout;