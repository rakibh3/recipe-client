import PropTypes from 'prop-types';
import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import app from '../firebase/firebase.init';
import useAxiosPublic from '../hooks/useAxiosPublic';
export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();
  const axiosPublic = useAxiosPublic();

  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const userData = {
          displayName: currentUser?.displayName,
          photoURL: currentUser?.photoURL,
          email: currentUser?.email,
        };

        axiosPublic.post('/user', userData).then((res) => {
          if (res?.data?.data.token) {
            localStorage.setItem('accessToken', res.data.data.token);
          }
        });
      } else {
        localStorage.removeItem('accessToken');
      }

      setLoading(false);
    });
    return () => {
      return unSubscribe();
    };
  }, [axiosPublic]);

  const authInfo = {
    user,
    loading,
    googleSignIn,
    logOut,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};
export default AuthProvider;

AuthProvider.propTypes = {
  children: PropTypes.node,
};
