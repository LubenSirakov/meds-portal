import './Navigation.css';
import { Link } from 'react-router-dom';

function Navigation() {
    return (
        <>
            <nav id="navbar" className="">
                <div className="nav-wrapper">

                    <div className="logo">

                        <Link to="/"><i className="fas fa-chess-knight"></i>Meds Portal</Link>
                    </div>


                    <ul id="menu">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/my-profile">My Profile</Link></li>
                        <li><Link to="/register">Register</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default Navigation;