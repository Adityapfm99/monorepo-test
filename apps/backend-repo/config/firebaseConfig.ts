import admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';
import 'dotenv/config';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import serviceAccount from '../config/serviceAccountKey.json';


admin.initializeApp({
  // credential: admin.credential.cert(serviceAccount),

  credential: admin.credential.cert(serviceAccount as ServiceAccount),
  // credential: admin.credential.cert(require(process.env.GOOGLE_APPLICATION_CREDENTIALS!)),
  
  databaseURL: 'https://backend-ebuddy-dd012-default-rtdb.firebaseio.com/',
});

export const db = admin.firestore();
const firebaseConfig = {
  apiKey: "AIzaSyARCLh1bPq7FwHYXpdjczNFb_1N2em-HOQ",
  authDomain: "backend-ebuddy-dd012.firebaseapp.com",
  projectId: "backend-ebuddy-dd012",
  storageBucket: "backend-ebuddy-dd012.appspot.com",
  messagingSenderId: "1072758298003",
  appId: "1:1072758298003:web:eeec7aec5e58c7ec3a0466",
  measurementId: "G-6SBYD1E22X",
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize and export Firebase Authentication
export const auth = getAuth(app);

// Export the app in case you need it for other Firebase services
export default app;
