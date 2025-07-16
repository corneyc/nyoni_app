// firebase.js
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCf4_1E3baRsk2kDdqWJthBye3zxJ4MoQE",
  authDomain: "nyoni-app.firebaseapp.com",
  projectId: "nyoni-app",
  storageBucket: "nyoni-app.appspot.com", // ← FIXED here!
  messagingSenderId: "238420708000",
  appId: "1:238420708000:web:5b6d5d1c647ae31ed297c5",
  measurementId: "G-313EBB1DQL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
const auth = getAuth(app);

// Optionally initialize analytics (only works on web)
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { auth };
