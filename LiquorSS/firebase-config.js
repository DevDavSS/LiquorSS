// Import the functions you need from the SDKs you need

import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from "firebase/app";
import {initializeAuth,getReactNativePersistence} from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";
import {getDatabase} from 'firebase/database';
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6WMBJ-_5yOs9R0Nlg4NimOBN70i3jKI8",
  authDomain: "liqu-17778.firebaseapp.com",
  projectId: "liqu-17778",
  storageBucket: "liqu-17778.firebasestorage.app",
  messagingSenderId: "559877028217",
  appId: "1:559877028217:web:27c16b7d35555e01b117a8",
  measurementId: "G-97EMCGRR4S"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app,{
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const analytics = getAnalytics(app);
export const databse= getDatabase(app);
export const db=getFirestore(app);