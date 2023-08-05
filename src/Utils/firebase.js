// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCG8T7iEPPzxyPfRvmQRoWouAxFiNkb_sg",
  authDomain: "redditclone-4a136.firebaseapp.com",
  projectId: "redditclone-4a136",
  storageBucket: "redditclone-4a136.appspot.com",
  messagingSenderId: "150769196023",
  appId: "1:150769196023:web:5dd14566433de256982cf2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };
