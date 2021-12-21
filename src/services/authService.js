import { useState } from 'react';
import { auth } from '../firebase';
import { setPersistence, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, browserLocalPersistence, browserSessionPersistence } from 'firebase/auth';
import * as medsService from './medsService';

setPersistence(auth, browserSessionPersistence)

//REGISTER
export const register = async (auth, email, password) => {
    try {
        const user = await createUserWithEmailAndPassword(auth, email, password);
        // medsService.createUser(auth, email)
        return user;
    } catch (error) {
        console.log(error.message);
    }
};

//LOGIN
export const login = async (auth, email, password) => {
    try {
        const user = await signInWithEmailAndPassword(auth, email, password);
        return user;
    } catch (error) {
        console.log(error.message);
    }
};

//LOGOUT
export const logout = async (auth) => {
    try {
        await signOut(auth);

    } catch (error) {
        console.log(error);
    }
};
