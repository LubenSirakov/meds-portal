import './WelcomeHeader.css';
import WelcomeTitle from './WelcomeTitle/WelcomeTitle.js';
import welcomeImage from './meds.jpg';

function WelcomeHeder() {
    return (
        <div className="welcome-header">
            <WelcomeTitle />
            <img className="welcome-image" src={welcomeImage} />
        </div>
    );
}

export default WelcomeHeder;