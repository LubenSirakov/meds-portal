import { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase.js';

export const AuthContext = createContext();

export const AuthProvider = ({
    children
}) => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return unsubscribe;
    }, [])

    return (
        <AuthContext.Provider value={{user}}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const authState = useContext(AuthContext);

    return authState;
}