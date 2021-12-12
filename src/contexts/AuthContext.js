import { createContext, useContext, useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase.js';

export const AuthContext = createContext();

const initialState = {
    email: '',
    password: ''
};

export const AuthProvider = ({
    children
}) => {
    const [user, setUser] = useState(initialState);

    const register = async () => {
        try {
            const newUser = await createUserWithEmailAndPassword(auth);
            console.log(newUser);
        } catch (error) {
            console.log(error.message);
        }
    }
}