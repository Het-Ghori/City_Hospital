// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCBBFPhiY11V78cA3f9J9wup_dJptlx8JQ",
    authDomain: "cityhospital-2d9e4.firebaseapp.com",
    projectId: "cityhospital-2d9e4",
    storageBucket: "cityhospital-2d9e4.appspot.com",
    messagingSenderId: "208099223018",
    appId: "1:208099223018:web:69aad1786d2e5d9e54fe93",
    measurementId: "G-B08RGF52ST"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app)
export const auth = getAuth(app);
export const storage = getStorage(app);
