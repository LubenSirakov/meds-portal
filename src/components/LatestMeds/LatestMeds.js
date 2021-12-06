import { useState, useEffect } from 'react';
import firebase from '../../firebase.js';

import MedCard from '../MedCard/MedCard.js';
import './LatestMeds.css';


function LatestMeds() {
    const [meds, setMeds] = useState([]);

    const ref = firebase.firestore().collection('meds');
    console.log(ref);

    function getMeds() {
        ref.onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            });
            setMeds(items);
        })
    }

    useEffect(() => {
        getMeds();
    }, [])

    return (
        <div className="latest-meds-wrapper">
            <h3>Latest medicines added to our list</h3>
            <div class="cards">
              {meds.map(x => <MedCard med={x} />)  }
            </div>
      </div>
    );
}

export default LatestMeds;