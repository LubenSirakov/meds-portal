import './WelcomeHeader.css';
import WelcomeTitle from './WelcomeTitle/WelcomeTitle.js';
import welcomeImage from './meds.jpg';
import LatestMeds from '../LatestMeds/LatestMeds.js';

function WelcomeHeder() {
    return (
        <div className="welcome-header">
            <WelcomeTitle />
            <img className="welcome-image" src={welcomeImage} />
            <LatestMeds />
        </div>
    );
}

export default WelcomeHeder;