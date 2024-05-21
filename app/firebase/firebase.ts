// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLlpITxyzZTM2j_6IRuE0tM418L55nLFU",
  authDomain: "nextchatapp-7d1d5.firebaseapp.com",
  projectId: "nextchatapp-7d1d5",
  storageBucket: "nextchatapp-7d1d5.appspot.com",
  messagingSenderId: "691093082429",
  appId: "1:691093082429:web:547ae12c975d4adaf67554"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const gProvider = new GoogleAuthProvider()
