// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getDatabase } from "firebase/database"
import { getStorage } from "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const API_KEY = process.env.REACT_APP_API_KEY
console.log()
const firebaseConfig = {
  apiKey: "AIzaSyBS-zyvLxsUKyVAVm5MZCIMU9f49NzoGUQ",
  authDomain: "react-firebase-chat-app-71271.firebaseapp.com",
  projectId: "react-firebase-chat-app-71271",
  storageBucket: "react-firebase-chat-app-71271.appspot.com",
  messagingSenderId: "377586260194",
  appId: "1:377586260194:web:5215cd599618194fc066bb",
  measurementId: "G-0D43C9JW6W",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export { app }
export const storage = getStorage(app)
export const authService = getAuth(app)
export const dbService = getFirestore(app)
export const realtimeDbService = getDatabase(app)
