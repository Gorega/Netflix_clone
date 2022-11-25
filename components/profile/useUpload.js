import {firebaseApp} from "../../lib/firebaseInit";
import { getStorage, ref, uploadBytesResumable, getDownloadURL,deleteObject } from "firebase/storage";
import { useState } from "react";
import { useRouter } from "next/router";

export function useUpload(){

        const defaultProfileImage = `https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png`;
        const router = useRouter();
        const [progress,setProgress] = useState(null);
        const [imageFile,setImageFile] = useState(defaultProfileImage);
        const [fileName,setFileName] = useState(null)

        const uploadProfileImage = (e)=>{
            const storage = getStorage();
            const file = e.target.files[0];
            // Upload file and metadata to the object 'images/mountains.jpg'
            const storageRef = ref(storage, 'media/' + file.name);
            const uploadTask = uploadBytesResumable(storageRef, file);
            setFileName(file.name)

            // Listen for state changes, errors, and completion of the upload.
            uploadTask.on('state_changed',
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(progress)
                switch (snapshot.state) {
                case 'paused':
                    //
                    break;
                case 'running':
                    //
                    break;
                }
            }, 
            (error) => {
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
                setProgress(null)
                setImageFile(downloadURL)
                });
            }
            );
        }

    const cancelHandler = ()=>{
        const storage = getStorage();
        // Create a reference to the file to delete
        const desertRef = ref(storage, 'media/' + fileName);
        // Delete the file
        deleteObject(desertRef).then(() => {
            // deleted successfuly handler
            setImageFile(defaultProfileImage)
        }).catch((error) => {
            // error handler
    });

    return router.replace("/profile")
}

return{imageFile,setImageFile,progress,uploadProfileImage,cancelHandler}

}