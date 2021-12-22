import './DateCheck.css';
import { useEffect, useState } from 'react';
import { auth } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import MedCard from '../MedCard/MedCard';
import * as medsService from '../../services/medsService';

// import dateCalculator from '../../dateCalculator/dateCalculator.js';

function DateCheck() {
    const [user, setUser] = useState({});
    const [medsToFetch, setMedsToFetch] = useState([]);
    const [meds, setMeds] = useState([]);
    const [prescDate, setPrescDate] = useState('');
    let newPrescDate = '';

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
                console.log(res);
            })

    }, [userId]);

    useEffect(() => {
        medsService.getAll()
            .then(res => {
                setMeds(res);
                console.log(res);
            })
    }, []);

    let usersMeds = meds.filter(med => medsToFetch?.includes(med.medId));
    console.log(usersMeds);



    const checkDate = (e) => {
        e.preventDefault();

        let formData = new FormData(e.currentTarget);
        let startDate = formData.get('start-date');
        let daysToAdd = Number(formData.get('days-to-add'));

        const addDate = (date, days) => {

            let result = new Date(date);
            result.setUTCDate(result.getDate() + days);

            let day = result.getDate();

            let month = result.getMonth();
            month = month + 1;

            let year = result.getFullYear();

            let nextDate = `${day}-${month}-${year}`;
            return nextDate;
        }

        newPrescDate = addDate(startDate, daysToAdd);

    }

    useEffect(() => {
        setPrescDate(newPrescDate);
    }, [newPrescDate]);


    return (
        <>

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

            <form className="date-check-wrapper" onSubmit={() => checkDate()}>
                <h2>Check when to get your next perscription</h2>

                <div className="mb-3">
                    <label htmlFor="input-date" className="form-label">Input date</label>
                    <input id="party" type="datetime-local" name="start-date" />

                </div>

                <div className="mb-3">
                    <label htmlFor="input-days" className="form-label">Days to add</label>
                    <input type="number" className="form-control" name="days-to-add" id="input-days" />
                </div>

                <div className="mb-3">
                    <label className="form-label">Your next perscription is on:</label>
                    <h4>{prescDate}</h4>
                </div>

                <input className="button submit" type="submit" value="Check date" />
            </form>
        </>
    );
};

export default DateCheck;