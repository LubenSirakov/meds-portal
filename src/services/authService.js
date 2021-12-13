import { useState } from 'react';

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

export const register = async (auth, email, password) => {
    try {
        const user = await createUserWithEmailAndPassword(auth, email, password);
        localStorage.set('user', user)
        console.log(user);
        localStorage.setItem('email', email);
        localStorage.setItem('password'. password);
        console.log('registered');
    } catch (error) {
        console.log(error.message);
    }
};

export const login = async (auth, email, password) => {
    try {
        const user = await signInWithEmailAndPassword(auth, email, password);
        console.log(user);
        localStorage.getItem('email');
        localStorage.getItem('password');
        console.log('logged');
    } catch (error) {
        console.log(error.message);
    }
};

export const logout = async (auth) => {
    await signOut(auth);
    localStorage.removeItem('email');
    localStorage.removeItem('password');
}