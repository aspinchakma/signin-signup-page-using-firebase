// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGU7NgttDel4TFstTETFMvANLFtOREbyg",
  authDomain: "practice-new-firebase-react.firebaseapp.com",
  projectId: "practice-new-firebase-react",
  storageBucket: "practice-new-firebase-react.firebasestorage.app",
  messagingSenderId: "829250840289",
  appId: "1:829250840289:web:26e6a5077dfd82a9ceb9a0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
