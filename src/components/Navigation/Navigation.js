import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import './Navigation.css';

import { auth } from '../../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { logout } from '../../services/authService.js';

function Navigation() {
    
    const [user, setUser] = useState({});

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return unsubscribe;
    }, [])

    const navigate = useNavigate();

    const onLogoutClick = () => {
        try {
            signOut(auth);
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    const GuestUser = () => {
        return (
            <>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/login">Login</Link></li>
            </>
        );
    };

    const LoggedUser = () => {
        return (
            <>
                <li>Welcome {user.email}</li>
                <li><Link to="/create">Create</Link></li>
                <li><Link to="/my-profile">My Profile</Link></li>
                <li onClick={onLogoutClick} >Logout</li>
            </>
        );
    };

    return (
        <>
            <nav id="navbar" className="">
                <div className="nav-wrapper">

                    <div className="logo">

                        <Link to="/">Meds Portal</Link>
                    </div>


                    <ul id="menu">
                        <li><Link to="/">Home</Link></li>
                        {!user
                            ? < GuestUser />
                            : <LoggedUser />
                        }

                    </ul>
                </div>
            </nav>
        </>
    );
}

export default Navigation;