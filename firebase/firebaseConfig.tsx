import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

export const firebaseConfig = {
    apiKey: "AIzaSyByaDzD43Ze0ORJHulBgYqgGN3-BHrI5Go",
    authDomain: "quelve-2520e.firebaseapp.com",
    projectId: "quelve-2520e",
    storageBucket: "quelve-2520e.appspot.com",
    messagingSenderId: "297542060459",
    appId: "1:297542060459:web:902e0fa1c743a471656aee",
    measurementId: "G-TLHPFMZ0Z7"
  };

  const app = initializeApp(firebaseConfig);

  // Initialize Firebase services
  const auth = getAuth(app);
  const db = getFirestore(app);
  const storage = getStorage(app);
  
  export { auth, db, storage };