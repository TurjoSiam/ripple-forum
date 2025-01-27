import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import auth from "../Firebase/Firebase.init";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const AuthProvider = ({ children }) => {

    const googleProvider = new GoogleAuthProvider();
    const axiosPublic = useAxiosPublic();

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
            const userInfo = {email: currentUser?.email}
            if(currentUser){
                axiosPublic.post('/jwt', userInfo)
            .then(res => {
                if(res.data.token){
                    localStorage.setItem('access-token', res.data.token)
                    setLoading(false);
                }
            })
            }
            else{
                localStorage.removeItem('access-token');
                setLoading(false);
            }
        })
        return () => {
            unSubscribe();
        }
    }, [axiosPublic])



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