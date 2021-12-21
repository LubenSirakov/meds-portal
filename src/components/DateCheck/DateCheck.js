import './DateCheck.css';
import { useEffect, useState } from 'react';
// import dateCalculator from '../../dateCalculator/dateCalculator.js';

function DateCheck() {
    const [prescDate, setPrescDate] = useState('');
    let newPrescDate = '';


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
    );
};

export default DateCheck;