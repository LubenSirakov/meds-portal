import LatestMeds from '../LatestMeds/LatestMeds.js';

import './WelcomeHeader.css';

function WelcomeHeder() {
    return (
        <div className="welcome-header">
            <h2 className="welcome-title">Welcome to Meds Portal!</h2>
            <p className="blog-post">Meds Portal is the place where you'll find anything and everything about meds. Here you can add new meds, edit existing ones, add meds to your collection, and much more! Come on and join us today! Sign up - it's free!</p>
            <img id='middle-drugs' src='https://cdn-icons-png.flaticon.com/512/2937/2937192.png' />
            <LatestMeds />
        </div>
    );
}

export default WelcomeHeder;