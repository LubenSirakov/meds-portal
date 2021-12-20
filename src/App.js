import { useState, useEffect } from 'react';

import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext.js';

import Navigation from './components/Navigation/Navigation.js';
import WelcomeHeder from './components/WelcomeHeader/WelcomeHeader.js';
import LatestMeds from './components/LatestMeds/LatestMeds.js';
import Register from './components/Register/Register.js';
import Login from './components/Login/Login.js';
import Create from './components/Create/Create.js';
import Edit from './components/Edit/Edit.js';
import MedDetails from './components/MedDetails/MedDetails.js';
import DateCheck from './components/DateCheck/DateCheck.js';
import MyProfile from './components/MyProfile/MyProfile.js';
import Footer from './components/Footer/Footer.js';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <AuthProvider>
      <Navigation authProvider={AuthProvider} />
      <div className="App">
        <Routes>
          <Route path="/" element={<WelcomeHeder />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/my-meds" element={<DateCheck />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<Create />} />
          <Route path="/edit/:medId" element={<Edit />} />          
          <Route path="/meds/:medId" element={<MedDetails />} />
        </Routes>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
