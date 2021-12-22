import { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';

import MedCard from '../MedCard/MedCard';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';
import { getAll } from '../../services/medsService.js';

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
    let userId = user?.uid;

    meds.filter(med => {
        if (med.owner === userId) {
            userAddedMeds.push(med);
        }
    });

    return (
        <>
            {user
                ? (
                    <div className="my-profile-wrapper">
                        <div className="profile-wrapper">
                            <div className="profile">
                                <img src="https://cdn.pixabay.com/photo/2018/04/18/18/56/user-3331257_960_720.png" alt={user.email} className="thumbnail" />
                                <div className="check"><i className="fas fa-check"></i></div>
                                <h3 className="name">{user.email}</h3>
                                <div className="btn-wrapper">
                                    <button type="button" className="btn"><Link to='/my-meds'>My Meds</Link></button>
                                </div>
                            </div>
                        </div>
                        <div className="user-meds-wrapper">
                            {userAddedMeds
                                ? (
                                    <>
                                        <h3 id="header-title">Meds added by {user.email}:</h3>
                                        <div className="cards-wrapper">
                                            {userAddedMeds.map(x => <MedCard key={x.medId} med={x} />)}
                                        </div>
                                    </>
                                )
                                : <h3 id="header-title">You have no meds added.</h3>}

                        </div>
                    </div>
                )
                : <Navigate to="/login" />
            }

        </>
    );
}

export default MyProfile;