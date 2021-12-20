import './WelcomeHeader.css';
import WelcomeTitle from './WelcomeTitle/WelcomeTitle.js';

import LatestMeds from '../LatestMeds/LatestMeds.js';

function WelcomeHeder() {
    return (
        <div className="welcome-header">
            <h2 className="welcome-title">Welcome to Meds Portal!</h2>

            <LatestMeds />
        </div>
    );
}

export default WelcomeHeder;