// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "cool-estate.firebaseapp.com",
  projectId: "cool-estate",
  storageBucket: "cool-estate.appspot.com",
  messagingSenderId: "226995549903",
  appId: "1:226995549903:web:9c502f341af3ba7afd29ba",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
