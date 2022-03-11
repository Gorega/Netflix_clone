import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import {server} from "../../lib/server";
import Layout from "./Layout";
import {useUpload} from "./useUpload";

function CreateProfile(){
    const router = useRouter();
    const [profileName,setProfileName] = useState(null);
    const [error,setError] = useState({status:false,msg:""});
    const {imageFile,progress,cancelHandler,uploadProfileImage} = useUpload();


    const createProfileHandler = ()=>{
        setError({status:false})
        axios.post(`${server}/api/profile/create-user`,{name:profileName,image:imageFile})
        .then(res => {
            router.replace("/profile")
        })
        .catch(err => {
            setError({status:true,msg:err.response.data.msg})
        });
    }
    
return <Layout
    title="Add Profile"
    text="Add a profile for another person watching Netflix."
    imageFile={imageFile}
    progress={progress}
    uploadProfileImage={uploadProfileImage}
    setProfileName={(e)=>setProfileName(e.target.value)}
    createProfileHandler={createProfileHandler}
    cancelHandler={cancelHandler}
    namePlaceholder="Name"
    profileName={profileName}
    error={error}
/>

}

export default CreateProfile;