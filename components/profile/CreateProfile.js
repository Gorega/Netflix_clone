import {firebaseApp} from "../../lib/firebaseInit";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL,deleteObject } from "firebase/storage";
import Layout from "./layout";

function CreateProfile(){
    const router = useRouter();
    const defaultProfileImage = `https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png`;
    const [profileName,setProfileName] = useState(null);
    const [imageFile,setImageFile] = useState(defaultProfileImage);

    const uploadProfileImage = (e)=>{
            const storage = getStorage();
            const file = e.target.files[0];
            // Upload file and metadata to the object 'images/mountains.jpg'
            const storageRef = ref(storage, 'media/' + file.name);
            const uploadTask = uploadBytesResumable(storageRef, file);

            // Listen for state changes, errors, and completion of the upload.
            uploadTask.on('state_changed',
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
                }
            }, 
            (error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;
                case 'storage/canceled':
                    // User canceled the upload
                    break;

                // ...

                case 'storage/unknown':
                    // Unknown error occurred, inspect error.serverResponse
                    break;
                }
            }, 
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setImageFile(downloadURL)
                });
            }
            );

    }

    const cancelHandler = ()=>{
        const storage = getStorage();
        // Create a reference to the file to delete
        const desertRef = ref(storage, 'media/' + imageFile);
        // Delete the file
        deleteObject(desertRef).then(() => {
        console.log("deleted")
        setImageFile(defaultProfileImage)
        }).catch((error) => {
        console.log(error)
        });

       return router.replace("/profile")
    }

    const createProfileHandler = ()=>{
        axios.post("http://localhost:3000/api/profile/create-user",{name:profileName,image:imageFile})
        .then(res => {
            router.replace("/profile")
        })
        .catch(err => console.log(err));
    }
    
return <Layout
    title="Add Profile"
    text="Add a profile for another person watching Netflix."
    imageFile={imageFile}
    uploadProfileImage={uploadProfileImage}
    setProfileName={(e)=>setProfileName(e.target.value)}
    createProfileHandler={createProfileHandler}
    cancelHandler={cancelHandler}
    namePlaceholder="Name"
    profileName={profileName}
/>

}

export default CreateProfile;