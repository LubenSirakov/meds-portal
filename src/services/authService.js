import { auth } from '../firebase';
import { setPersistence, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, browserSessionPersistence } from 'firebase/auth';

setPersistence(auth, browserSessionPersistence)

//REGISTER
export const register = async (auth, email, password) => {
    try {

        await createUserWithEmailAndPassword(auth, email, password);

    } catch (error) {
        
        throw new Error(error.message);
    }
};

//LOGIN
export const login = async (auth, email, password) => {
    try {

        await signInWithEmailAndPassword(auth, email, password);

    } catch (error) {
        throw new Error(error.message)
    }
};

//LOGOUT
export const logout = async (auth) => {
    try {
        await signOut(auth);

    } catch (error) {
        throw new Error(error.message);
    }
};
