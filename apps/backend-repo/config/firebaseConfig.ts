import admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';
import 'dotenv/config'; // Ensure dotenv is loaded for environment variables
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import serviceAccount from '../config/serviceAccountKey.json';

// Firebase Admin SDK Initialization
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL, // Ensure this is in your .env file
});

// Export Firestore Database
export const db = admin.firestore();

// Firebase Client SDK Configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase Client App
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Export
export const auth = getAuth(app);

// Export the Firebase Client App
export default app;
