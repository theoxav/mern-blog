// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-616e8.firebaseapp.com",
  projectId: "mern-blog-616e8",
  storageBucket: "mern-blog-616e8.appspot.com",
  messagingSenderId: "36906850474",
  appId: "1:36906850474:web:7e64400c6d97430fb418d3",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
