import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence, getAuth } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getAnalytics } from 'firebase/analytics';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBymiMGlVkaRiYHKUDooZloQsgZi3oTsBA",
  authDomain: "liquorsso.firebaseapp.com",
  projectId: "liquorsso",
  storageBucket: "liquorsso.firebasestorage.app",
  messagingSenderId: "387802343878",
  appId: "1:387802343878:web:859b183902a6f110b5eac7",
  measurementId: "G-P77X7T4X6L"
};

// Inicializar Firebase solo si no se ha inicializado previamente
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Usar getAuth en lugar de inicializarlo de nuevo
export const auth = getAuth(app);

// Inicialización de otros servicios
export const analytics = getAnalytics(app);
export const database = getDatabase(app);
export const db = getFirestore(app);






