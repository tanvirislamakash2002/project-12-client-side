import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth } from '../firebase/firebase.init';
import { AuthContext } from './AuthContext';
import { useJwtToken } from '../hooks/useJwtToken';


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)


    // Register
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // update user
    const updateUser = (updatedData) => {
        return updateProfile(auth.currentUser, updatedData)
    }

    // login
    const signInUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    // signin with  google
    const signInWithGoogle = () => {
        setLoading(true)
        const googleProvider = new GoogleAuthProvider()
        return signInWithPopup(auth, googleProvider)
    }

    // signOut User
    const signOutUser = () => {
        setLoading(true)
        localStorage.removeItem('token')
        return signOut(auth)
    }
    const { mutate: fetchJwtToken } = useJwtToken();
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);

            if (currentUser?.email) {
                fetchJwtToken(currentUser.email);
            } else {
                localStorage.removeItem('token');
            }
        });

        return () => unSubscribe();
    }, [fetchJwtToken]);

    const authData = {
        createUser,
        updateUser,
        signInUser,
        signInWithGoogle,
        user,
        setUser,
        signOutUser,
        loading,
    }
    return (
        <AuthContext.Provider value={authData}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;