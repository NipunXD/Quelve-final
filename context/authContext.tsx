import { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  signOut,
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import {firebaseConfig} from '../firebase/firebaseConfig';
import firebase from 'firebase/compat/app';
import { doc, getDoc, getFirestore } from 'firebase/firestore';

export const app = firebase.initializeApp(firebaseConfig, "quelve-2520e");
export const auth = getAuth(app);
export const db = getFirestore(app);  
const provider = new GoogleAuthProvider;
export const AuthContext = createContext<any>({});
export const currentUser = auth.currentUser;

export const useAuthContext = () => useContext(AuthContext);  

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<any>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          console.log(userData);
          setUser({
            uid: userDoc.id,
            email: userData.email,
            username: userData.username,
            profilePicture: userData.profilePicture,
            bio: userData?.bio,
            premium: userData?.premium,
            bannerUrl: userData?.bannerUrl,
          });
          setCurrentUser({
            uid: userDoc.id,
            email: userData.email,
            username: userData.username,
            profilePicture: userData.profilePicture,
            bio: userData?.bio,
            premium: userData?.premium,
            bannerUrl: userData?.bannerUrl,
          });
        } else {
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  
  const login = async () => {
    const userCredential = await signInWithPopup(auth, provider);
    const { user } = userCredential;
    const userRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      const userData = userDoc.data();
    setUser({
      uid: userDoc.id,
            email: userData.email,
            username: userData.username,
            profilePicture: userData.profilePicture,
            bio: userData?.bio,
            premium: userData?.premium,
            bannerUrl: userData?.bannerUrl,
    });
  }
    return user; // Return the user object
  };

  const logout = async () => {
    setUser(null);
    return await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user,setUser, setCurrentUser, login, logout }}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};