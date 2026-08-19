import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { useEffect, useState } from 'react';
import AuthContext from '../contexts/AuthContext';
import { auth } from '../firebase/firebase.config';

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account',
});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [, setProfileVersion] = useState(0);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  const registerUser = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const loginUser = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const loginWithGoogle = () =>
    signInWithPopup(auth, googleProvider);

  const updateUserProfile = async (profileInformation) => {
    if (!auth.currentUser) {
      throw new Error('No signed-in account was found.');
    }

    await updateProfile(auth.currentUser, profileInformation);
    await auth.currentUser.reload();

    setProfileVersion((currentVersion) => currentVersion + 1);
  };

  const logOut = () => signOut(auth);

  const authValue = {
    user,
    loading,
    registerUser,
    loginUser,
    loginWithGoogle,
    updateUserProfile,
    logOut,
  };

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;