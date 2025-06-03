import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeAuth, getReactNativePersistence } from '@firebase/auth';
import {
  ANDROID_API_KEY,
  ANDROID_APP_ID,
  IOS_API_KEY,
  IOS_APP_ID,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET
} from '@env';



// Firebase configuration for Android
const firebaseConfig = {
  apiKey: ANDROID_API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  appId: ANDROID_APP_ID
};

// Firebase configuration for iOS
const firebaseConfigiOS = {
  apiKey: IOS_API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  appId: IOS_APP_ID
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(AsyncStorage)
});
export const db = getFirestore(FIREBASE_APP);
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP);


