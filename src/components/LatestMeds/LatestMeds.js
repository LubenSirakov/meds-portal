import { useState, useEffect } from 'react';

import MedCard from '../MedCard/MedCard.js';
// import { getAll } from '../../services/medsService.js';
import './LatestMeds.css';


function LatestMeds() {
  const [meds, setMeds] = useState([]);
//TODO: extract in medsService!
  useEffect(() => {
    fetch('https://meds-portal-69e7a-default-rtdb.europe-west1.firebasedatabase.app/meds.json')
      .then(res => res.json())
      .then(res => {
        res = Object.values(res);
        console.log(res)
        setMeds(res);
      })
  }, [])

  return (
    <div className="latest-meds-wrapper">
      <h3>Latest medicines added to our list</h3>
      <div className="cards">
        {meds.map(x => <MedCard key={x.name} med={x} />)}
      </div>
    </div>
  );
}

export default LatestMeds;