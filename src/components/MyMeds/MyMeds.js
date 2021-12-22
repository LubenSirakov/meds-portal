import { useEffect, useState } from 'react';

import MedCard from '../MedCard/MedCard';

import { auth } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import * as medsService from '../../services/medsService';

import './MyMeds.css';

function DateCheck() {
    const [user, setUser] = useState({});
    const [medsToFetch, setMedsToFetch] = useState([]);
    const [meds, setMeds] = useState([]);
    const [date, setDate] = useState('');

    const [input, setInput] = useState({
        startDate: '',
        daysToAdd: Number,
    });

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return unsubscribe;
    }, []);

    let userId = user?.uid;

    useEffect(() => {
        medsService.getUsersMeds(userId)
            .then(res => {
                setMedsToFetch(res);
            })

    }, [userId]);

    useEffect(() => {
        medsService.getAll()
            .then(res => {
                setMeds(res);
            })
    }, []);

    let usersMeds = meds.filter(med => medsToFetch?.includes(med.medId));

    return (
        <div className="my-meds-wrapper">

            <div className="user-meds-wrapper">
                {usersMeds
                    ? (
                        <>
                            <h3 id="header-title">These are your meds</h3>
                            <div className="cards-wrapper">
                                {usersMeds.map(x => <MedCard key={x.medId} med={x} />)}
                            </div>
                        </>
                    )
                    : <h3 id="header-title">You have no meds added.</h3>}

            </div>
        </div>
    );
};

export default DateCheck;