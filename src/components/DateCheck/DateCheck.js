import './DateCheck.css';
// import dateCalculator from '../../dateCalculator/dateCalculator.js';

function DateCheck() {

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
            console.log(nextDate);
        }

        addDate(startDate, daysToAdd);

        // let result = dateCalculator(startDate, daysToAdd);

    }

    return (
        <form className="date-check-wrapper" onSubmit={checkDate}>
            <h2>Check when to get your next perscription</h2>

            <div className="mb-3">
                <label for="input-date" className="form-label">Input date</label>           
                <input id="party" type="datetime-local" name="start-date"/>

            </div>

            <div className="mb-3">
                <label for="input-days" className="form-label">Days to add</label>
                <input type="number" className="form-control" name="days-to-add" id="input-days" />
            </div>

            <input className="button submit" type="submit" value="Check date" />
        </form>
    );
};

export default DateCheck;