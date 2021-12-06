import { useState, useEffect } from 'react';
import firebase from './firebase.js';
import { Routes, Route } from 'react-router-dom'

import Navigation from './components/Navigation/Navigation.js';
import WelcomeHeder from './components/WelcomeHeader/WelcomeHeader.js';
import LatestMeds from './components/LatestMeds/LatestMeds.js';
import Register from './components/Register/Register.js';
import Login from './components/Login/Login.js';
import MedDetails from './components/MedDetails/MedDetails.js';
import MyProfile from './components/MyProfile/MyProfile.js';
import Footer from './components/Footer/Footer.js';

import './App.css';

function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<WelcomeHeder />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* <MedDetails /> */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
