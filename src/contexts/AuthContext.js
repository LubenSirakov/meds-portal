import { createContext, useContext, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase.js';

export const AuthContext = createContext();

export const AuthProvider = ({
    children
}) => {
    const [user, setUser] = useState({});

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser)
    });

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const authState = useContext(AuthContext);

    return authState;
}