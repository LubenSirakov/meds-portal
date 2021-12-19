import { Link } from 'react-router-dom';
import './MedCard.css';

function MedCard({ med }) {
    // console.log(med);
    return (
        <div className="card">
            <img src={med.imgUrl} alt={med.name} />
            <div className="card-body">
                <h2>{med.name}</h2>
                <p>{med.description}</p>
                <button className="button"> <Link to={`/meds/${med.medId}`} className="btn btn-sm animated-button thar-four">Learn more</Link> </button>
            </div>
        </div>
    );
}

export default MedCard;