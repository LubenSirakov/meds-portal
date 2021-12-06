import MedCard from '../MedCard/MedCard.js';
import './LatestMeds.css';

function LatestMeds() {
    return (
        <>
            <h3>Latest medicines added to our list</h3>
            <div class="cards">
                <MedCard />
                <MedCard />
                <MedCard />
            </div>
        </>
    );
}

export default LatestMeds;