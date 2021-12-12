import './Navigation.css';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase.js';

function Navigation() {

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
                <li><Link to="/create">Create</Link></li>
                <li><Link to="/my-profile">My Profile</Link></li>
                <li>Hello {auth.currentUser.email}</li>
            </>
        );
    };
    return (
        <>
            <nav id="navbar" className="">
                <div className="nav-wrapper">

                    <div className="logo">

                        <Link to="/"><i className="fas fa-chess-knight"></i>Meds Portal</Link>
                    </div>


                    <ul id="menu">
                        <li><Link to="/">Home</Link></li>
                        {auth.currentUser !== null
                            ? <GuestUser />
                            : <LoggedUser />
                        }

                    </ul>
                </div>
            </nav>
        </>
    );
}

export default Navigation;