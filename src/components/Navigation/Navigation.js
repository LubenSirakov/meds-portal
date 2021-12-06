import './Navigation.css';

function Navigation() {
    return (
        <>
            <nav id="navbar" className="">
                <div className="nav-wrapper">

                    <div className="logo">

                        <a href="#home"><i className="fas fa-chess-knight"></i>Meds Portal</a>
                    </div>


                    <ul id="menu">
                        <li><a href="#home">Home</a></li>
                        <li><a href="#about">About</a></li>
                        <li><a href="#services">Register</a></li>
                        <li><a href="#services">Login</a></li>
                    </ul>
                </div>
            </nav>



            <div className="menuIcon">
                <span className="icon icon-bars"></span>
                <span className="icon icon-bars overlay"></span>
            </div>


            {/* <div className="overlay-menu">
                <ul id="menu">
                    <li><a href="#home">Home</a></li>
                    <li><a href="#services">Services</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </div> */}
        </>
    );
}

export default Navigation;