import React from "react";
import { useState, useEffect } from "react";
import { Outlet } from 'react-router-dom';

import Login from "../components/Login/Login";

import { auth } from '../firebase';
import { onAuthStateChanged } from "firebase/auth";

export const PrivateRoute = () => {
    const [user, setUser] = useState({});

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return unsubscribe;
    }, [])

    return user ? <Outlet /> : <Login />
}