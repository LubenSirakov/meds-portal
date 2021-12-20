import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';

import MedCard from '../MedCard/MedCard';
import * as medsService from '../../services/medsService.js';
import './MedsAddedByUser.css';


function MedAddedByUser() {
    const [meds, setMeds] = useState([]);
    const [user, setUser] = useState({});

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return unsubscribe;
    }, [])

    useEffect(() => {
        medsService.getAll()
            .then(res => {
                console.log(res);
                setMeds(res);
            })

    }, [])



    return (
        <div className="latest-wrapper">


            <h3 id="header-title">Meds added by the user:</h3>

            <div className="cards-wrapper">

                {meds.map(x => <MedCard key={x.medId} med={x} />)}
            </div>

        </div>

    );
}

export default MedAddedByUser;