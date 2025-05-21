const VITE_FIREBASE_APP_API_KEY = import.meta.env.VITE_FIREBASE_APP_API_KEY;
const VITE_FIREBASE_APP_AUTH_DOMAIN = import.meta.env.VITE_FIREBASE_APP_AUTH_DOMAIN;
const VITE_FIREBASE_APP_PROJECT_ID = import.meta.env.VITE_FIREBASE_APP_PROJECT_ID;
const VITE_FIREBASE_APP_STORAGE_BUCKET = import.meta.env.VITE_FIREBASE_APP_STORAGE_BUCKET;
const VITE_FIREBASE_APP_MESSAGING_SENDER_ID = import.meta.env.VITE_FIREBASE_APP_MESSAGING_SENDER_ID;
const VITE_FIREBASE_APP_APP_ID = import.meta.env.VITE_FIREBASE_APP_APP_ID;

import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: VITE_FIREBASE_APP_API_KEY,
    authDomain: VITE_FIREBASE_APP_AUTH_DOMAIN,
    projectId: VITE_FIREBASE_APP_PROJECT_ID,
    storageBucket: VITE_FIREBASE_APP_STORAGE_BUCKET,
    messagingSenderId: VITE_FIREBASE_APP_MESSAGING_SENDER_ID,
    appId: VITE_FIREBASE_APP_APP_ID
};

export const firebaseApp = initializeApp(firebaseConfig);