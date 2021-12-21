import { useState, useEffect } from 'react';

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


      <h3 id="header-title">That's all folks!</h3>
      <div className="cards-wrapper">
        {meds.map(x => <MedCard key={x.medId} med={x} />)}
      </div>
      
    </div>

  );
}

export default AllMeds;