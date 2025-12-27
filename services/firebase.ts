import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Basic validation to surface configuration issues early
if (!firebaseConfig.apiKey || !firebaseConfig.authDomain || !firebaseConfig.projectId) {
  console.error('Firebase configuration invalid (check .env):', firebaseConfig);
  console.error('Steps: 1) Ensure VITE_FIREBASE_* values in .env match your Firebase project. 2) Enable Email/Password in Firebase Console > Authentication > Sign-in method. 3) Restart the dev server.');
  throw new Error('Firebase config missing. Ensure VITE_FIREBASE_* variables are set and restart the dev server.');
}

console.debug('FIREBASE CONFIG', { apiKey: firebaseConfig.apiKey?.slice(0,8) + '***', authDomain: firebaseConfig.authDomain, projectId: firebaseConfig.projectId });

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);