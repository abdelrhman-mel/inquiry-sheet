// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "psi-inquiry.firebaseapp.com",
  projectId: "psi-inquiry",
  storageBucket: "psi-inquiry.appspot.com",
  messagingSenderId: "506912591934",
  appId: "1:506912591934:web:fe5fb56c3478287494416f",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
