import { useState, useEffect } from 'react';
import firebase from './firebase.js';

import Navigation from './components/Navigation/Navigation.js';
import WelcomeHeder from './components/WelcomeHeader/WelcomeHeader.js';
import LatestMeds from './components/LatestMeds/LatestMeds.js';
import Register from './components/Register/Register.js';
import Login from './components/Login/Login.js';
import MedDetails from './components/MedDetails/MedDetails.js';
import MyProfile from './components/MyProfile/MyProfile.js';

import './App.css';
// import { QuerySnapshot } from '@firebase/firestore';

function App() {
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
    <div className="App">
      {/* <h2>meds</h2>
      {meds.map(x => (
        <div key={x.id}>

          <h2>{x.name}</h2>
          <p>{x.description}</p>
        </div>
      ))} */}
      <Navigation />
      <WelcomeHeder />
      <div className="latest-meds-wrapper">
        <LatestMeds />
      </div>
      <MyProfile />
      <Register />
      <Login />
      <MedDetails />
    </div>
  );
}

export default App;
