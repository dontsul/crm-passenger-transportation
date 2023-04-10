// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: 'AIzaSyCCb4qQJ3u-uGRbtcOIwfBf09X-YUROjKw',
  authDomain: 'srm-passenger-transportation.firebaseapp.com',
  projectId: 'srm-passenger-transportation',
  storageBucket: 'srm-passenger-transportation.appspot.com',
  messagingSenderId: '80110360218',
  appId: '1:80110360218:web:6eb25a87db6dfc68dd3123',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
