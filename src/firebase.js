import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCET0_6uqD2hD3s0hPGK-qMrWtRIo2jBPI",
    authDomain: "meds-portal-69e7a.firebaseapp.com",
    databaseURL: "https://meds-portal-69e7a-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "meds-portal-69e7a",
    storageBucket: "meds-portal-69e7a.appspot.com",
    messagingSenderId: "683696146915",
    appId: "1:683696146915:web:b4fe20daaae6466fff38d6"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);