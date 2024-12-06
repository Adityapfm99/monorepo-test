// frontend-repo/apis/firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import 'dotenv/config';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration object (Replace the placeholders with your actual values if necessary)
const firebaseConfig = {
  apiKey: "AIzaSyARCLh1bPq7FwHYXpdjczNFb_1N2em-HOQ",
  authDomain: "backend-ebuddy-dd012.firebaseapp.com",
  databaseURL: "https://backend-ebuddy-dd012-default-rtdb.firebaseio.com",
  projectId: "backend-ebuddy-dd012",
  storageBucket: "backend-ebuddy-dd012.appspot.com",
  messagingSenderId: "1072758298003",
  appId: "1:1072758298003:web:eeec7aec5e58c7ec3a0466",
  measurementId: "G-6SBYD1E22X"
};


// Initialize the Firebase app
console.log("Firebase initializing...");
const app = initializeApp(firebaseConfig);
console.log("Firebase initialized:", app);

// Initialize and export Firebase Authentication
export const auth = getAuth(app);

// Initialize and export Firestore
export const db = getFirestore(app);

// Export the initialized app (if needed in other parts of the project)
export default app;
