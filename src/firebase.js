import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBaB2fOA7QGkDLW5iNlhSTLLRBo16rH00Y",
  authDomain: "chat-app-c62dd.firebaseapp.com",
  projectId: "chat-app-c62dd",
  storageBucket: "chat-app-c62dd.firebasestorage.app",
  messagingSenderId: "380047287404",
  appId: "1:380047287404:web:25e9027d4734ac96376449",
  measurementId: "G-THQXKNL4DH"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);