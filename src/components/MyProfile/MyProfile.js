import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';
import { Link } from 'react-router-dom';
import { getAll } from '../../services/medsService.js';

import MedCard from '../MedCard/MedCard';
import './MyProfile.css';

function MyProfile() {
    const [user, setUser] = useState({});
    const [meds, setMeds] = useState([]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return unsubscribe;
    }, [])

    useEffect(() => {
        getAll()
            .then(res => {
                setMeds(res);
            })

    }, [])
    
    let userAddedMeds = [];

    meds.filter(med => {
        if (med.owner == user.uid) {
            userAddedMeds.push(med);
        }
    });

    return (
        <>
            <div className="profile-wrapper">
                <div className="profile">
                    <img src="https://media-exp1.licdn.com/dms/image/C4E03AQHevXrIEfUhvA/profile-displayphoto-shrink_800_800/0/1636621187597?e=1643846400&v=beta&t=c0O5dv1xF4EdFt7FZLuvSgdlM10z9HMSx6xDnnTz2kA" className="thumbnail" />
                    <div className="check"><i className="fas fa-check"></i></div>
                    <h3 className="name">{user.email}</h3>
                    <h2 className="name">Meber since: {user.email}</h2>
                    <div className="btn-wrapper">
                        {/* <button type="button" className="btn"><Link to={`/meds/${user.uid}`}>Meds added by me</Link></button> */}
                        {/* <button type="button" className="btn">Edit Profile</button> */}
                        <button type="button" className="btn"><Link to='/my-meds'>My Meds</Link></button>
                    </div>
                </div>
            </div>
            <div className="latest-wrapper">
                <h3 id="header-title">Meds added by {user.email}:</h3>
                <div className="cards-wrapper">
                    {userAddedMeds.map(x => <MedCard key={x.medId} med={x} />)}
                </div>
            </div>
        </>
    );
}

export default MyProfile;