import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import * as firebaseAuth from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
} from "@env";

// Las credenciales NUNCA se escriben aquí: provienen del archivo .env
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
};

// Evita re-inicializar la app en cada recarga de Metro
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Auth con persistencia en AsyncStorage (mantiene la sesión al cerrar la app).
// Se usa un try/catch porque initializeAuth falla si Auth ya fue inicializado.
let auth;
try {
  auth = firebaseAuth.initializeAuth(app, {
    persistence: firebaseAuth.getReactNativePersistence(AsyncStorage),
  });
} catch (error) {
  auth = firebaseAuth.getAuth(app);
}

const db = getFirestore(app);

export { app, auth, db };