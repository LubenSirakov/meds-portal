import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAnNtBaJgTclz-ON4PQwpJyZoo-oIG0wC4",
    authDomain: "meds-portal.firebaseapp.com",
    projectId: "meds-portal",
    storageBucket: "meds-portal.appspot.com",
    messagingSenderId: "604575864712",
    appId: "1:604575864712:web:80dec04b2324d2fa2a0c3d"
};

firebase.initializeApp(firebaseConfig);

export default firebase;