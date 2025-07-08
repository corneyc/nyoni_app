
// firebase.j
import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCf4_1E3baRsk2kDdqWJthBye3zxJ4MoQE",
  authDomain: "nyoni-app.firebaseapp.com",
  projectId: "nyoni-app",
  storageBucket: "nyoni-app.appspot.com",
  messagingSenderId: "238420708000",
  appId: "1:238420708000:web:5b6d5d1c647ae31ed297c5",
  measurementId: "G-313EBB1DQL"
};

// ✅ Avoid reinitializing on hot reload
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// ✅ Firebase Auth with persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
