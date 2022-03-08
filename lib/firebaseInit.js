import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "netflix-cea3f.firebaseapp.com",
  projectId: "netflix-cea3f",
  storageBucket: "netflix-cea3f.appspot.com",
  messagingSenderId: "342415005724",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

export const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);