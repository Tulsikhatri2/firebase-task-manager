// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCc_NpDfYG-7lEPZTk6lIRXe60LcpVN9fE",
  authDomain: "task-manager-c03b5.firebaseapp.com",
  projectId: "task-manager-c03b5",
  storageBucket: "task-manager-c03b5.firebasestorage.app",
  messagingSenderId: "773904320804",
  appId: "1:773904320804:web:aea6c850f73c2764ad0bb1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export {db}