import axios from "axios";
import { useEffect, useState } from "react";
import Layout from "./Layout";
import { useRouter } from "next/router";
import {server} from "../../lib/server"
import {useUpload} from "./useUpload";

function EditProfile({profile}){
    const router = useRouter();
    const [error,setError] = useState({status:false,msg:""})
    const [profileName,setProfileName] = useState(profile.name);
    const {imageFile,setImageFile,progress,cancelHandler,uploadProfileImage} = useUpload();

    const updateProfileHandler = ()=>{
        setError({status:false})
        axios.patch(`${server}/api/profile/update-user/${profile.name}`,{name:profileName,image:imageFile})
        .then(res=> router.replace("/profile"))
        .catch(error => {
            setError({status:true,msg:error.response.data.msg})
        });
    }

    useEffect(()=>{
        setImageFile(profile.image)
    },[])

return <Layout
    title="Edit Profile"
    text="Edit your current profile."
    imageFile={imageFile}
    progress={progress}
    uploadProfileImage={uploadProfileImage}
    setProfileName={(e)=>setProfileName(e.target.value)}
    createProfileHandler={updateProfileHandler}
    cancelHandler={cancelHandler}
    namePlaceholder={profile.name}
    profileName={profileName}
    error={error}
    />

}

export default EditProfile;