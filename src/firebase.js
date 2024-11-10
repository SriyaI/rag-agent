// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAt_VzXtOtwdXT5AG17Tvt2jcEweSMaTlo",
  authDomain: "assignment-4c669.firebaseapp.com",
  projectId: "assignment-4c669",
  storageBucket: "assignment-4c669.appspot.com",
  messagingSenderId: "88892215639",
  appId: "1:88892215639:web:1d955e73c4696a72376e12",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
