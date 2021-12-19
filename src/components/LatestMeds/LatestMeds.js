import { useState, useEffect } from 'react';

import MedCard from '../MedCard/MedCard.js';
import { getAll } from '../../services/medsService.js';
import './LatestMeds.css';


function LatestMeds() {
  const [meds, setMeds] = useState([]);

  useEffect(() => {
    getAll()
      .then(res => {
        console.log(res);
        setMeds(res);
      })

  }, [])

  return (
    <div className="latest-meds-wrapper">
      <h3 id="header-title">Latest medicines added to our list</h3>
      <div className="cards">
        {meds.map(x => <MedCard key={x.medId} med={x} />)}
      </div>
    </div>
  );
}

export default LatestMeds;