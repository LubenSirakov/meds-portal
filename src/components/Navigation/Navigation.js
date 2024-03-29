import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { auth } from '../../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

import './Navigation.css';

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
                <li><Link to="/all-meds">All meds</Link></li>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/login">Login</Link></li>
            </>
        );
    };

    const LoggedUser = () => {
        return (
            <>
                <li>Welcome {user.email}</li>
                <li><Link to="/all-meds">All meds</Link></li>
                <li><Link to="/create">Create</Link></li>
                <li><Link to="/my-profile">My Profile</Link></li>
                <button className="logout-button" onClick={onLogoutClick} >Logout</button>
            </>
        );
    };

    return (
        <>
            <nav id="navbar" className="">
                <div className="nav-wrapper">

                    <div className="logo">
                        <img id='drug-icon' src='https://cdn-icons.flaticon.com/png/512/1050/premium/1050791.png?token=exp=1640247933~hmac=5f74b63ac0796958064f15b3d621a108'/>
                        <Link to="/" className="logo-tag">Meds Portal</Link>
                    </div>


                    <ul id="menu">
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