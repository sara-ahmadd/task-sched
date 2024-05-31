import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDIr5wJF76K2hD6AI22i5O-HLdYVMXKOKI",
  authDomain: "tasks-196c9.firebaseapp.com",
  projectId: "tasks-196c9",
  storageBucket: "tasks-196c9.appspot.com",
  messagingSenderId: "107304546633",
  appId: "1:107304546633:web:5ec9cc079d8d950d34ea98",
  measurementId: "G-J06BM9BLLP",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
