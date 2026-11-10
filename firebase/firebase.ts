// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage"

const requiredConfig = (name: string, value: string | undefined) => {
  if (!value?.trim()) {
    throw new Error(
      `Missing Firebase configuration: ${name}. Add it to .env.local and restart the Next.js server.`
    );
  }

  return value;
};

const firebaseConfig = {
  apiKey: requiredConfig(
    "NEXT_PUBLIC_FIREBASE_API_KEY",
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY
  ),
  authDomain: "nextchatapp-7d1d5.firebaseapp.com",
  projectId: requiredConfig(
    "NEXT_PUBLIC_PROJECT_ID",
    process.env.NEXT_PUBLIC_PROJECT_ID
  ),
  storageBucket: "nextchatapp-7d1d5.appspot.com",
  messagingSenderId: requiredConfig(
    "NEXT_PUBLIC_MESSAGING_SENDER_ID",
    process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID
  ),
  appId: requiredConfig("NEXT_PUBLIC_APP_ID", process.env.NEXT_PUBLIC_APP_ID),
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const gProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
