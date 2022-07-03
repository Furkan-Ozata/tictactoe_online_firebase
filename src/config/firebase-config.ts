
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyAVrN1GXNBv7ihuMsG-ahZuATU8w_KMvgw",
  authDomain: "tic-tac-toe-ee50e.firebaseapp.com",
  projectId: "tic-tac-toe-ee50e",
  storageBucket: "tic-tac-toe-ee50e.appspot.com",
  messagingSenderId: "243999653864",
  appId: "1:243999653864:web:5e039e7cf2b1d0380b6e5d",
  databaseURL: "https://tic-tac-toe-ee50e-default-rtdb.europe-west1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
export const firestore = getFirestore(app);
export const database = getDatabase(app);