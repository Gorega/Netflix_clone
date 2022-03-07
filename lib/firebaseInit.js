import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD1b0DKzYAbZ2Eb5l2mqc3BkPoe2ADScV0",
  authDomain: "netflix-cea3f.firebaseapp.com",
  projectId: "netflix-cea3f",
  storageBucket: "netflix-cea3f.appspot.com",
  messagingSenderId: "342415005724",
  appId: "1:342415005724:web:e4c90f2becff970ed8e7d9"
};

export const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);