import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import MedCard from '../MedCard/MedCard.js';
import { getAll } from '../../services/medsService.js';

import './AllMeds.css';

function AllMeds() {
  const [meds, setMeds] = useState([]);

  useEffect(() => {
    getAll()
      .then(res => {
        setMeds(res);
      })

  }, [])

  return (
    <div className="all-meds-wrapper">


      <h3 id="header-title">Here are all the meds we have!</h3>
      <div className="cards-wrapper">
        {meds.map(x => <MedCard key={x.medId} med={x} />)}
      </div>
      <h5 className="additional-message">You have a med you want to add? Head over to our <Link to="/create">Create Page</Link> and add it!</h5>
    </div>

  );
}

export default AllMeds;