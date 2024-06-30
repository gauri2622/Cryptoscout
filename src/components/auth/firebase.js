// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC-cKCdEsXYzDXMrBPWXxEcemrJZ0oo20Y",
  authDomain: "finalyearproject-9e4bf.firebaseapp.com",
  databaseURL: "https://finalyearproject-9e4bf-default-rtdb.firebaseio.com",
  projectId: "finalyearproject-9e4bf",
  storageBucket: "finalyearproject-9e4bf.appspot.com",
  messagingSenderId: "1064459326724",
  appId: "1:1064459326724:web:d215983f6853c79379ec51",
  measurementId: "G-C01PYQB7L3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const googleAuthProvider = new GoogleAuthProvider();

export { app, auth, googleAuthProvider, db };