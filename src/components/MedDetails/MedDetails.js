import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { auth } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';

import * as medsService from '../../services/medsService';

import './MedDetails.css';

function MedDetails() {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [med, setMed] = useState([]);
    const [userMeds, setUserMeds] = useState([]);
    // const [disable, setDisable] = useState(true);
    const { medId } = useParams();

    //AUTH
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return unsubscribe;
    }, []);

    //GET CURRENT MED
    useEffect(() => {
        medsService.getOne(medId)
            .then(res => {
                setMed(res);
            })
    }, [medId])

    let userId = user?.uid;

    useEffect(() => {

        medsService.getUsersMeds(userId)
            .then(res => {
                setUserMeds(res);
            })
    }, [userId])

    console.log(userMeds);
    const addMedHandler = async () => {
        let userId = user.uid;

        const medToAdd = {
            userId,
            medId,
            medsList: [],
            usersList: []
        }

        let res = await medsService.addMeddToCollection(medToAdd);
        console.log(res);
        navigate('/');
    };

    const UserButtons = () => {
        return (
            <div className="buttons-container">
                {user?.uid && (user.uid == med.owner
                    ? (<>
                        <button className="button-details" ><Link to={`/edit/${med.medId}`}>Edit</Link></button>
                        <button className="button-details" onClick={() => deleteHandler(med.medId)}><Link to="/">Delete</Link></button>
                    </>)
                    : ''
                )}
                {userMeds?.includes(medId)
                    ? <h4>This med is already in your collection</h4>
                    : <button className="button-details" onClick={() => addMedHandler()}>Add to my meds</button>}

            </div>
        );
    }

    const GuestButtons = () => {
        return (
            <div>
                <p>Login to add this to your meds</p>
                <button className="button-details"><Link to="/login">Login</Link></button>
            </div>
        );
    }

    const deleteHandler = async (medId) => {

        try {
            await medsService.deleteMed(medId);

        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div className='details-card'>
            <img src={med.imgUrl} className="card-img-details" alt={med.name} />
            <div className='container'>
                <h3 className='card-name'>{med.name}</h3>
                <h5 className='card-tablets'>Count of tablets: {med.count}</h5>
                <p className='card-description'>{med.description}</p>
            </div>
            {!user
                ? <GuestButtons />
                : <UserButtons />}

        </div>

    );
}

export default MedDetails;