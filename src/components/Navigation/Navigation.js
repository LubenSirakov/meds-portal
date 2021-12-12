import './Navigation.css';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase.js';
import { signOut } from 'firebase/auth';

function Navigation({
    user
}) {
    const navigate = useNavigate();
    console.log(user?.email);
    const logout = async () => {
        await signOut(auth)
        navigate('/');
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
                <li><Link to="/create">Create</Link></li>
                <li><Link to="/my-profile">My Profile</Link></li>
                <button onClick={logout} >Logout</button>
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
                        {user == undefined || user?.email
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