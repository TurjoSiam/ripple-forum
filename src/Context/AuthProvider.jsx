import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import auth from "../Firebase/Firebase.init";

const AuthProvider = ({ children }) => {

    const googleProvider = new GoogleAuthProvider();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const userUpdateWhenSignin = (updatedInfo) => {
        setLoading(true);
        return updateProfile(auth.currentUser, updatedInfo);
    }

    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            console.log(currentUser);
            setLoading(false);

        })
        return () => {
            unSubscribe();
        }
    }, [])



    const signOutUser = () => {
        setLoading(true);
        return signOut(auth);
    }




    const authInfo = {
        user,
        loading,
        createUser,
        signInUser,
        userUpdateWhenSignin,
        signInWithGoogle,
        signOutUser
    }


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;