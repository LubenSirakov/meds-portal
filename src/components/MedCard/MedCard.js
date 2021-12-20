import { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { onAuthStateChanged, updateCurrentUser } from 'firebase/auth';

import { Link } from 'react-router-dom';

import './MedCard.css';

function MedCard({ med }) {
    const [user, setUser] = useState({});

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return unsubscribe;
    }, [])


    return (
            <div className="card">
                <img src={med.imgUrl} alt={med.name} />
                <div className="card-body">
                    <h2>{med.name}</h2>
                    <p>Count of tablets: {med.count}</p>
                    <button className="button"> <Link to={`/meds/${med.medId}`} className="btn btn-sm animated-button thar-four">Learn more</Link> </button>
                </div>
            </div>
    );
}

export default MedCard;