import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';




// Firebase configuration for Android
const firebaseConfig = {
  apiKey: "AIzaSyDeYrrkGAfjZhWLFgrlbr4aeL9jsnNa03M",
  authDomain: "rpe-app-cc0c7.firebaseapp.com",
  projectId: "rpe-app-cc0c7",
  storageBucket: "rpe-app-cc0c7.appspot.com",
  appId: "1:695845550647:android:035e59f1df9a71868e1db2"
};

// Firebase configuration for iOS
const firebaseConfigiOS = {
  apiKey: "AIzaSyDbwUtgGFBtJEu7iuodKf9kNsjp6JGmbHU",
  authDomain: "rpe-app-cc0c7.firebaseapp.com",
  projectId: "rpe-app-cc0c7",
  storageBucket: "rpe-app-cc0c7.appspot.com",
  appId: "1:695845550647:ios:bafbbd7218eba99c8e1db2"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const db = getFirestore(FIREBASE_APP);
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP);


